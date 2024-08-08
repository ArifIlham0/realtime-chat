import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import useGlobal from "../config/global";
import { COLORS } from "../constants/color";

const SearchButton = ({ user }) => {
  if (user.status === "connected") {
    return (
      <FontAwesome6
        name="circle-check"
        size={30}
        color="#20D080"
        style={{ marginRight: 10 }}
      />
    );
  }

  const requestConnect = useGlobal((state) => state.requestConnect);

  const data = {};

  switch (user.status) {
    case "no-connection":
      (data.text = "Connect"), (data.disabled = false);
      data.onPress = () => requestConnect(user.username);
      break;
    case "pending-them":
      (data.text = "Pending"), (data.disabled = true);
      data.onPress = () => {};
      break;
    case "pending-me":
      (data.text = "Accept"), (data.disabled = false);
      data.onPress = () => {};
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity
      onPress={data.onPress}
      disabled={data.disabled}
      style={{
        backgroundColor: data.disabled ? "#505055" : COLORS.blue,
        paddingHorizontal: 14,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
      }}
    >
      <Text
        style={{
          color: data.disabled ? "#808080" : COLORS.white,
          fontWeight: "bold",
        }}
      >
        {data.text}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchButton;
