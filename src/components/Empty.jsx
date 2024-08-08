import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

const Empty = ({ icon, message, centered = true }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: centered ? "center" : "flex-start",
        alignItems: "center",
        paddingVertical: 120,
      }}
    >
      <FontAwesome6
        name={icon}
        color={"#D0D0D0"}
        size={90}
        style={{ marginBottom: 16 }}
      />
      <Text style={{ color: "#C3C3C3", fontSize: 16 }}>{message}</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
