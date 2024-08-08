import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import useGlobal from "../config/global";
import { Empty, RequestRow } from "../components";

const RequestScreen = () => {
  const requestList = useGlobal((state) => state.requestList);

  if (requestList === null) {
    return <ActivityIndicator color={"#404040"} style={{ flex: 1 }} />;
  }

  if (requestList.length === 0) {
    return <Empty icon={"bell"} message={"No requests"} />;
  }

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.sender.username}
        data={requestList}
        overScrollMode="never"
        bounces={true}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RequestRow item={item} />}
      />
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({});
