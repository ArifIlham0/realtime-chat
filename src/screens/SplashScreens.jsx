import { Animated, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Title } from "../components";

const SplashScreens = () => {
  const translateY = new Animated.Value(0);
  const duration = 800;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Title text={"RealtimeChat"} color={"white"} />
      </Animated.View>
    </View>
  );
};

export default SplashScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
