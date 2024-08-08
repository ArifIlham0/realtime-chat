import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, TextField, Title } from "../components";
import api from "../config/api";
import utils from "../config/utils";
import useGlobal from "../config/global";
import { COLORS } from "../constants/color";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useGlobal((state) => state.login);

  const handleLogin = () => {
    const failUsername = !username;
    const failPassword = !password;

    if (failUsername) {
      setUsernameError("Username is required");
    }

    if (failPassword) {
      setPasswordError("Password is required");
    }

    if (failUsername && failPassword) {
      return;
    }

    setIsLoading(true);

    api({
      method: "POST",
      url: "/chat/login/",
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        const credentials = {
          username: username,
          password: password,
        };

        utils.log("Login: ", response.data);
        login(credentials, response.data.user, response.data.token);

        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          Alert.alert(
            "Failed Login",
            "Please check your username or password."
          );
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);

        setIsLoading(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
        >
          <Title text={"RealtimeChat"} color={COLORS.white} />
          <View style={{ height: 30 }} />
          <TextField
            title={"Username"}
            value={username}
            setValue={setUsername}
            error={usernameError}
            setError={setUsernameError}
          />
          <TextField
            title={"Password"}
            value={password}
            setValue={setPassword}
            error={passwordError}
            setError={setPasswordError}
            secureTextEntry={true}
          />
          <Button title={"Login"} onPress={handleLogin} isLoading={isLoading} />
          <Text
            style={{ textAlign: "center", marginTop: 40, color: COLORS.white }}
          >
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              style={{ color: COLORS.blue }}
            >
              Register
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginScreen;
