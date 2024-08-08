import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/color";

const Button = ({ title, onPress, isLoading }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {isLoading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: "bold" }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue,
    borderRadius: 26,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
