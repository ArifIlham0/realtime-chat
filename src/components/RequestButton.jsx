import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import useGlobal from "../config/global";
import { COLORS } from "../constants/color";

const RequestButton = ({ item }) => {
  const requestAccept = useGlobal((state) => state.requestAccept);

  return (
    <TouchableOpacity
      onPress={() => requestAccept(item.sender.username)}
      style={styles.button}
    >
      <Text style={{ color: COLORS.white, fontWeight: "bold" }}>Accept</Text>
    </TouchableOpacity>
  );
};

export default RequestButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
