import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Empty, FriendRow } from "../components";
import useGlobal from "../config/global";

const FriendScreen = ({ navigation }) => {
  const friendList = useGlobal((state) => state.friendList);

  if (friendList === null) {
    return <ActivityIndicator color={"#404040"} style={{ flex: 1 }} />;
  }

  if (friendList.length === 0) {
    return <Empty icon={"inbox"} message={"No messages yet"} />;
  }

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={friendList}
        overScrollMode="never"
        bounces={true}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FriendRow navigation={navigation} item={item} />
        )}
      />
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({});
