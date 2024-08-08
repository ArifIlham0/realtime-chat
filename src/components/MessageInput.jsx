import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../constants/color";

const MessageInput = ({ message, setMessage, onSend }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Message.."
        placeholderTextColor={COLORS.black}
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSend}>
        <FontAwesome6
          name="paper-plane"
          size={22}
          color={COLORS.white}
          style={{ marginHorizontal: 12 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#D0D0D0",
    backgroundColor: "white",
    height: 50,
  },
  container: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
  },
});
