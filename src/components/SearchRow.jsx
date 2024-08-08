import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Thumbnail from "./Thumbnail";
import SearchButton from "./SearchButton";
import Cell from "./Cell";
import { COLORS } from "../constants/color";

const SearchRow = ({ user }) => {
  return (
    <Cell>
      <Thumbnail url={user.thumbnail} size={76} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text
          style={{ fontWeight: "bold", color: COLORS.white, marginBottom: 4 }}
        >
          {user.name}
        </Text>
        <Text style={{ color: "#606060" }}>{user.username}</Text>
      </View>
      <SearchButton user={user} />
    </Cell>
  );
};

export default SearchRow;
