import { create } from "zustand";
import secure from "./secure";
import { api } from "./api";
import utils from "./utils";

function responseThumbnail(set, get, data) {
  set((state) => ({
    user: data,
  }));
}

function responseSearch(set, get, data) {
  set((state) => ({
    searchList: data,
  }));
}

function responseRequestConnect(set, get, connection) {
  const user = get().user;

  if (user.username === connection.sender.username) {
    const searchList = [...get().searchList];
    const searchIndex = searchList.findIndex(
      (request) => request.username === connection.receiver.username
    );

    if (searchIndex >= 0) {
      searchList[searchIndex].status = "pending-them";
      set((state) => ({
        searchList: searchList,
      }));
    }
  } else {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      (request) => request.sender.username === connection.sender.username
    );

    if (requestIndex === -1) {
      requestList.unshift(connection);
      set((state) => ({
        requestList: requestList,
      }));
    }
  }
}

function responseRequestList(set, get, requestList) {
  set((state) => ({
    requestList: requestList,
  }));
}

function responseRequestAccept(set, get, connection) {
  const user = get().user;

  if (user.username === connection.receiver.username) {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      (request) => request.id === connection.id
    );

    if (requestIndex >= 0) {
      requestList.splice(requestIndex, 1);
      set((state) => ({
        requestList: requestList,
      }));
    }
  }

  const sl = get().searchList;

  if (sl === null) {
    return;
  }

  const searchList = [...sl];
  let searchIndex = -1;

  if (user.username === connection.receiver.username) {
    searchIndex = searchList.findIndex(
      (user) => user.username === connection.sender.username
    );
  } else {
    searchIndex = searchList.findIndex(
      (user) => user.username === connection.receiver.username
    );
  }

  if (searchIndex >= 0) {
    searchList[searchIndex].status = "connected";
    set((state) => ({
      searchList: searchList,
    }));
  }
}

function responseFriendList(set, get, friendList) {
  set((state) => ({
    friendList: friendList,
  }));
}

function responseMessageList(set, get, data) {
  set((state) => ({
    messageList: [...get().messageList, ...data.messages],
    messageNext: data.next,
    messagesUsername: data.friend.username,
  }));
}

function responseMessageSend(set, get, data) {
  const username = data.friend.username;
  const friendList = [...get().friendList];
  const friendIndex = friendList.findIndex(
    (item) => item.friend.username === username
  );

  if (friendIndex >= 0) {
    const item = friendList[friendIndex];
    item.preview = data.message.text;
    item.updated = data.message.created;

    friendList.splice(friendIndex, 1);
    friendList.unshift(item);

    set((state) => ({
      friendList: friendList,
    }));
  }

  if (username !== get().messagesUsername) {
    return;
  }

  const messageList = [data.message, ...get().messageList];

  set((state) => ({
    messageList: messageList,
    messageTyping: null,
  }));
}

function responseFriendNew(set, get, friend) {
  const friendList = [friend, ...get().friendList];

  set((state) => ({
    friendList: friendList,
  }));
}

function responseMessageType(set, get, data) {
  if (data.username !== get().messagesUsername) return;

  set((state) => ({
    messageTyping: new Date(),
  }));
}

const useGlobal = create((set, get) => ({
  // Initialize

  initialized: false,
  authenticated: false,
  user: {},
  socket: null,
  searchList: null,
  friendList: null,
  messageList: [],
  requestList: null,
  messagesUsername: null,
  messageTyping: null,
  messageNext: null,

  init: async () => {
    const credentials = await secure.get("credentials");
    if (credentials) {
      try {
        const response = await api({
          method: "POST",
          url: "/chat/login/",
          data: {
            username: credentials.username,
            password: credentials.password,
          },
        });
        if (response.status !== 200) {
          throw "Authentication failed";
        }
        const user = response.data.user;
        const token = response.data.token;

        secure.set("token", token);

        set((state) => ({
          initialized: true,
          authenticated: true,
          user: user,
        }));
        return;
      } catch (error) {
        console.log("Error init useGlobal: ", error);
      }
    }
    set((state) => ({
      initialized: true,
    }));
  },

  // Authentication

  login: (credentials, user, token) => {
    secure.set("credentials", credentials);
    secure.set("token", token);

    set((state) => ({
      authenticated: true,
      user: user,
    }));
  },
  logout: () => {
    secure.wipe();

    set((state) => ({
      authenticated: false,
      user: {},
    }));
  },

  // Websocket

  socketConnect: async () => {
    const token = await secure.get("token");

    const socket = new WebSocket(
      `ws://10.0.2.2:8000/chat/?token=${token.access}`
    );

    socket.onopen = () => {
      utils.log("Socket connected");

      socket.send(
        JSON.stringify({
          source: "request.list",
        })
      );
      socket.send(
        JSON.stringify({
          source: "friend.list",
        })
      );
    };
    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);

      utils.log("onmessage parsed: ", parsed);

      const response = {
        "friend.list": responseFriendList,
        "friend.new": responseFriendNew,
        "message.list": responseMessageList,
        "message.send": responseMessageSend,
        "message.type": responseMessageType,
        "request.accept": responseRequestAccept,
        "request.connect": responseRequestConnect,
        "request.list": responseRequestList,
        search: responseSearch,
        thumbnail: responseThumbnail,
      };
      const resp = response[parsed.source];

      if (!resp) {
        utils.log("parsed source" + parsed.source + " not found in response");
        return;
      }

      resp(set, get, parsed.data);
    };
    socket.onerror = (error) => {
      utils.log("Socket error", error.message);
    };
    socket.onclose = () => {
      utils.log("Socket closed");
    };

    set((state) => ({
      socket: socket,
    }));
  },

  socketClose: () => {
    const socket = get().socket;

    if (socket) {
      socket.close();
    }

    set((state) => ({
      socket: null,
    }));
  },

  // Search

  searchUsers: (query) => {
    if (query) {
      const socket = get().socket;
      socket.send(
        JSON.stringify({
          source: "search",
          query: query,
        })
      );
    } else {
      set((state) => ({
        searchList: null,
      }));
    }
  },

  // Messages

  messageSend: (connectionId, message) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.send",
        connectionId: connectionId,
        message: message,
      })
    );
  },

  messageType: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.type",
        username: username,
      })
    );
  },

  messagesList: (connectionId, page = 0) => {
    if (page === 0) {
      set((state) => ({
        messageList: [],
        messageNext: null,
        messageTyping: null,
        messagesUsername: null,
      }));
    } else {
      set((state) => ({
        messageNext: null,
      }));
    }

    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.list",
        connectionId: connectionId,
        page: page,
      })
    );
  },

  // Requests

  requestConnect: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.connect",
        username: username,
      })
    );
  },

  requestAccept: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.accept",
        username: username,
      })
    );
  },

  // Thumbnail

  uploadThumbnail: (file) => {
    const socket = get().socket;

    socket.send(
      JSON.stringify({
        source: "thumbnail",
        base64: file.base64,
        filename: file.fileName,
      })
    );
  },
}));

export default useGlobal;
