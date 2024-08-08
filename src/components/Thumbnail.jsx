import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import utils from "../config/utils";
import { COLORS } from "../constants/color";

const Thumbnail = ({ url, size }) => {
  return (
    <Image
      source={utils.thumbnail(url)}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#E0E0E0",
        borderWidth: 0.5,
        borderColor: COLORS.white,
      }}
    />
  );
};

export default Thumbnail;

const styles = StyleSheet.create({});
