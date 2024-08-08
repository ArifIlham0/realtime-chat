import {
  HomeScreen,
  LoginScreen,
  MessageScreen,
  RegisterScreen,
  SearchScreen,
  SplashScreens,
} from "./src/screens";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";
import useGlobal from "./src/config/global";
import { useEffect, useState } from "react";
import { COLORS } from "./src/constants/color";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.black,
  },
};

const App = () => {
  const [loaded, error] = useFonts({
    "LeckerliOne-Regular": require("./assets/fonts/LeckerliOne-Regular.ttf"),
  });
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const initialized = useGlobal((state) => state.initialized);
  const authenticated = useGlobal((state) => state.authenticated);

  const init = useGlobal((state) => state.init);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      setTimeout(() => setIsSplashVisible(false), 1500);
    }
    init();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  if (isSplashVisible) {
    return <SplashScreens />;
  }

  return (
    <NavigationContainer theme={LightTheme}>
      <StatusBar barStyle={"dark-content"} />
      <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
        {!initialized ? (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreens}
              options={{ headerShown: false }}
            />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: COLORS.black,
                },
                headerTintColor: COLORS.white,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
