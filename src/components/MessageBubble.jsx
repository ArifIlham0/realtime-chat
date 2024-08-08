import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Thumbnail from "./Thumbnail";
import useGlobal from "../config/global";

const MessageTypingAnimation = ({ offset }) => {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const total = 1000;
    const bump = 200;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(bump * offset),
        Animated.timing(y, {
          toValue: 1,
          duration: bump,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: 0,
          duration: bump,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(total - bump * 2 - bump * offset),
      ])
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const translateY = y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        marginHorizontal: 1.5,
        borderRadius: 4,
        borderColor: "#606060",
        transform: [{ translateY }],
      }}
    />
  );
};

const MessageBubbleMe = ({ text }) => {
  return (
    <View style={{ flexDirection: "row", padding: 4, paddingRight: 12 }}>
      <View style={{ flex: 1 }} />
      <View style={styles.bubble2}>
        <Text style={{ color: "white", fontSize: 16, lineHeight: 18 }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const MessageBubbleFriend = ({ text = "", friend, typing = false }) => {
  return (
    <View style={{ flexDirection: "row", padding: 4, paddingLeft: 16 }}>
      <Thumbnail url={friend.thumbnail} size={42} />
      <View style={styles.bubble}>
        {typing ? (
          <View style={{ flexDirection: "row" }}>
            <MessageTypingAnimation offset={0} />
            <MessageTypingAnimation offset={1} />
            <MessageTypingAnimation offset={2} />
          </View>
        ) : (
          <Text style={{ color: "#202020", fontSize: 16, lineHeight: 18 }}>
            {text}
          </Text>
        )}
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const MessageBubble = ({ index, message, friend }) => {
  const [showTyping, setShowTyping] = useState(false);

  const messageTyping = useGlobal((state) => state.messageTyping);

  useEffect(() => {
    if (index !== 0) return;
    if (messageTyping === null) {
      setShowTyping(false);
      return;
    }
    setShowTyping(true);

    const check = setInterval(() => {
      const now = new Date();
      const ms = now - messageTyping;

      if (ms > 10000) {
        setShowTyping(false);
      }
    }, 1000);
    return () => clearInterval(check);
  }, [messageTyping]);

  if (index === 0) {
    if (showTyping) {
      return <MessageBubbleFriend friend={friend} typing={true} />;
    }
    return;
  }

  return message.is_me ? (
    <MessageBubbleMe text={message.text} />
  ) : (
    <MessageBubbleFriend text={message.text} friend={friend} />
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "#D0D2DB",
    borderRadius: 21,
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    marginLeft: 8,
    minHeight: 42,
  },
  bubble2: {
    backgroundColor: "#303040",
    borderRadius: 21,
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    marginRight: 8,
    minHeight: 42,
  },
});
