import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { MessageBubble, MessageHeader, MessageInput } from "../components";
import useGlobal from "../config/global";
import { COLORS } from "../constants/color";

const MessageScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");

  const messageSend = useGlobal((state) => state.messageSend);
  const messageList = useGlobal((state) => state.messageList);
  const messagesList = useGlobal((state) => state.messagesList);
  const messageNext = useGlobal((state) => state.messageNext);
  const messageType = useGlobal((state) => state.messageType);
  const friend = route.params.friend;
  const connectionId = route.params.id;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <MessageHeader friend={friend} />,
      headerBackTitleVisible: false,
      headerTintColor: COLORS.white,
      headerStyle: {
        backgroundColor: COLORS.black,
        elevation: 5,
      },
    });
  }, []);

  useEffect(() => {
    messagesList(connectionId);
  }, []);

  const onSend = () => {
    const cleaned = message.replace(/\s+/g, " ").trim();

    if (cleaned.length === 0) return;
    messageSend(connectionId, cleaned);
    setMessage("");
  };

  const onType = (value) => {
    setMessage(value);
    messageType(friend.username);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={[{ id: -1 }, ...messageList]}
          inverted={true}
          overScrollMode="never"
          bounces={true}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (messageNext) {
              messagesList(connectionId, messageNext);
            }
          }}
          renderItem={({ item, index }) => (
            <MessageBubble index={index} message={item} friend={friend} />
          )}
        />
      </View>
      <MessageInput message={message} setMessage={onType} onSend={onSend} />
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
