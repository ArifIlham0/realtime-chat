import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Cell from "./Cell";
import Thumbnail from "./Thumbnail";
import RequestButton from "./RequestButton";
import utils from "../config/utils";
import { COLORS } from "../constants/color";

const RequestRow = ({ item }) => {
  const message = "Requesting to follow you";

  return (
    <Cell>
      <Thumbnail url={item.sender.thumbnail} size={76} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text
          style={{ fontWeight: "bold", color: COLORS.grey, marginBottom: 4 }}
        >
          {item.sender.name}
        </Text>
        <Text style={{ color: "#606060" }}>
          {message}{" "}
          <Text style={{ color: "#909090", fontSize: 13 }}>
            {utils.formatTime(item.created)}
          </Text>
        </Text>
      </View>
      <RequestButton item={item} />
    </Cell>
  );
};

export default RequestRow;
