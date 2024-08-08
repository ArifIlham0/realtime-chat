import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Cell from "./Cell";
import Thumbnail from "./Thumbnail";
import utils from "../config/utils";
import { COLORS } from "../constants/color";

const FriendRow = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Message", item);
      }}
    >
      <Cell>
        <Thumbnail url={item.friend.thumbnail} size={76} />
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text
            style={{ fontWeight: "bold", color: COLORS.grey, marginBottom: 4 }}
          >
            {item.friend.name}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#606060" }}>{item.preview}</Text>
            <Text style={{ color: "#909090", fontSize: 13 }}>
              {utils.formatTime(item.updated)}
            </Text>
          </View>
        </View>
      </Cell>
    </TouchableOpacity>
  );
};

export default FriendRow;

const styles = StyleSheet.create({});
