import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Title = ({ text, color }) => {
  return <Text style={[styles.text, { color: color }]}>{text}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 48,
    fontFamily: "LeckerliOne-Regular",
  },
});
