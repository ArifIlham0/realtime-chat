import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Thumbnail from "./Thumbnail";
import { COLORS } from "../constants/color";

const MessageHeader = ({ friend }) => {
  return (
    <View style={styles.container}>
      <Thumbnail url={friend.thumbnail} size={30} />
      <Text style={styles.text}>{friend.name}</Text>
    </View>
  );
};

export default MessageHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
