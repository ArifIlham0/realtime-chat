import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../constants/color";

const SmallButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FontAwesome6
        name="right-from-bracket"
        size={20}
        color={COLORS.white}
        style={{ marginRight: 20 }}
      />
      <Text style={{ fontWeight: "bold", color: COLORS.white }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
    backgroundColor: COLORS.blue,
    marginTop: 40,
  },
});
