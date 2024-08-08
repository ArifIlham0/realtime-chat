import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/color";

const Cell = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Cell;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: COLORS.white,
    height: 106,
  },
});
