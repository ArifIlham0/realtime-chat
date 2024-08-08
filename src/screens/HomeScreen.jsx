import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RequestScreen from "./RequestScreen";
import FriendScreen from "./FriendScreen";
import ProfileScreen from "./ProfileScreen";
import { FontAwesome6 } from "@expo/vector-icons";
import useGlobal from "../config/global";
import { Thumbnail } from "../components";
import { COLORS } from "../constants/color";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const socketConnect = useGlobal((state) => state.socketConnect);
  const socketClose = useGlobal((state) => state.socketClose);
  const user = useGlobal((state) => state.user);

  const handleSearch = () => {
    navigation.navigate("Search");
  };

  useEffect(() => {
    socketConnect();

    return () => {
      socketClose();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerTitleAlign: "center",
        headerTitleStyle: { color: COLORS.white },
        headerStyle: { backgroundColor: COLORS.black },
        headerLeft: () => (
          <View style={{ marginLeft: 16 }}>
            <Thumbnail url={user.thumbnail} size={28} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome6
              name="magnifying-glass"
              size={22}
              color={COLORS.white}
              style={{ marginRight: 16 }}
            />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Request: "bell",
            Friend: "inbox",
            Profile: "user-large",
          };

          const icon = icons[route.name];
          return <FontAwesome6 name={icon} size={28} color={color} />;
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.blue,
          borderTopColor: COLORS.grey,
          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen name="Request" component={RequestScreen} />
      <Tab.Screen name="Friend" component={FriendScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E0E0E0",
  },
});
