import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/color";

const TextField = ({
  title,
  value,
  setValue,
  error,
  setError,
  secureTextEntry = false,
}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(secureTextEntry);

  return (
    <View>
      <Text
        style={{
          color: error ? "#FF5555" : COLORS.grey,
          marginVertical: 6,
          paddingLeft: 16,
        }}
      >
        {error ? error : title}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={isSecureEntry}
          autoCapitalize="none"
          autoComplete="off"
          value={value}
          placeholder={title}
          onChangeText={(text) => {
            setValue(text);
            if (error) {
              setError("");
            }
          }}
          style={[
            styles.input,
            {
              borderColor: error ? "#FF5555" : null,
              borderWidth: error ? 1 : 0,
            },
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecureEntry((prev) => !prev)}
            style={{ paddingRight: 16, paddingLeft: 5 }}
          >
            <Ionicons
              name={isSecureEntry ? "eye-off" : "eye"}
              size={24}
              color="#70747A"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#E1E2E4",
    borderRadius: 26,
    height: 52,
    fontSize: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E1E2E4",
    borderRadius: 26,
    height: 52,
  },
});
