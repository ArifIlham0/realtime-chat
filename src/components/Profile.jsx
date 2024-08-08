import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import useGlobal from "../config/global";
import utils from "../config/utils";
import { COLORS } from "../constants/color";

const Profile = ({ onPress }) => {
  const user = useGlobal((state) => state.user);

  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 20 }}>
      <Image source={utils.thumbnail(user.thumbnail)} style={styles.image} />
      <View style={styles.icon}>
        <FontAwesome6 name="pencil" size={15} color={"#D0D0D0"} />
      </View>
    </TouchableOpacity>
  );
};

export default Profile;

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#E0E0E0",
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#202020",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
  },
});
