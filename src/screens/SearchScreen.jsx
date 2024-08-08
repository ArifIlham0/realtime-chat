import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Empty, SearchRow } from "../components";
import useGlobal from "../config/global";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const searchList = useGlobal((state) => state.searchList);
  const searchUsers = useGlobal((state) => state.searchUsers);

  useEffect(() => {
    searchUsers(query);
  }, [query]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ padding: 16, borderBottomWidth: 1, borderColor: "#F0F0F0" }}
      >
        <View>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search.."
            placeholderTextColor={"#B0B0B0"}
            style={styles.input}
          />
          <FontAwesome6
            name="magnifying-glass"
            size={20}
            color={"#505050"}
            style={{ position: "absolute", left: 20, top: 17 }}
          />
        </View>
      </View>
      {searchList === null ? (
        <Empty
          icon="magnifying-glass"
          message={"Search for friends"}
          centered={false}
        />
      ) : searchList.length === 0 ? (
        <Empty
          icon="triangle-exclamation"
          message={'No users found for "' + query + '"'}
          centered={false}
        />
      ) : (
        <FlatList
          keyExtractor={(item) => item.username}
          data={searchList}
          overScrollMode="never"
          bounces={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <SearchRow user={item} />}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#E1E2E4",
    height: 52,
    borderRadius: 26,
    padding: 16,
    fontSize: 16,
    paddingLeft: 50,
  },
});
