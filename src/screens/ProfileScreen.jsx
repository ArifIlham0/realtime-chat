import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Profile, SmallButton } from "../components";
import useGlobal from "../config/global";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants/color";

const ProfileScreen = () => {
  const logout = useGlobal((state) => state.logout);
  const user = useGlobal((state) => state.user);
  const uploadThumbnail = useGlobal((state) => state.uploadThumbnail);

  const chooseImage = async () => {
    try {
      console.log("Choosing image");
      let result = {};

      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
      const file = result.assets[0];
      uploadThumbnail(file);
    } catch (error) {
      console.log("Error choosing image: ", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 100 }}>
      <Profile onPress={chooseImage} />
      <Text style={styles.text}>{user.name}</Text>
      <Text style={{ textAlign: "center", color: "#606060", fontSize: 14 }}>
        @{user.username}
      </Text>
      <SmallButton onPress={logout} title={"Logout"} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: COLORS.grey,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
});
