import {
  Alert,
  Keyboard,
  ScrollView,
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

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useGlobal((state) => state.login);

  const handleRegister = () => {
    const failFirstName = !firstName;
    const failLastName = !lastName;
    const failUsername = !username || username.length < 5;
    const failPassword = !password || password.length < 8;
    const failConfirmPass = confirmPass !== password || !confirmPass;

    if (failFirstName) {
      setFirstNameError("First Name is required");
    }
    if (failLastName) {
      setLastNameError("Last Name is required");
    }
    if (failUsername) {
      setUsernameError("Username must be at least 5 characters");
    }
    if (failPassword) {
      setPasswordError("Password must be at least 8 characters");
    }
    if (failConfirmPass) {
      setConfirmPassError("Password does not match");
    }

    if (
      failFirstName ||
      failLastName ||
      failUsername ||
      failPassword ||
      failConfirmPass
    ) {
      return;
    }

    setIsLoading(true);

    api({
      method: "POST",
      url: "/chat/register/",
      data: {
        username: username,
        first_name: firstName,
        last_name: lastName,
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
          Alert.alert("Failed Register", "Please check all field.");
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={true}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 16 }}
        >
          <View style={{ height: 30 }} />
          <Title text={"RealtimeChat"} color={COLORS.white} />
          <Text style={styles.text}>Register</Text>
          <TextField
            title={"First Name"}
            value={firstName}
            setValue={setFirstName}
            error={firstNameError}
            setError={setFirstNameError}
          />
          <TextField
            title={"Last Name"}
            value={lastName}
            setValue={setLastName}
            error={lastNameError}
            setError={setLastNameError}
          />
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
          <TextField
            title={"Confirm Password"}
            value={confirmPass}
            setValue={setConfirmPass}
            error={confirmPassError}
            setError={setConfirmPassError}
            secureTextEntry={true}
          />
          <Button
            title={"Register"}
            onPress={handleRegister}
            isLoading={isLoading}
          />
          <Text
            style={{ textAlign: "center", marginTop: 20, color: COLORS.white }}
          >
            Already have an account?{" "}
            <Text
              onPress={() => navigation.goBack()}
              style={{ color: COLORS.blue }}
            >
              Login
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
