import colors from "@/constants/colors";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StatusBar, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from "react-redux";
import ToastManager from 'toastify-react-native'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// Custom toast configuration
const toastConfig = {
  success: (props) => (
    <View style={{ backgroundColor: colors.dark.primary, padding: 16, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
    </View>
  ),
  // Override other toast types as needed
}


function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back", headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      {/* <Stack.Screen name="(dashboard)" /> */}
      <Stack.Screen name="(admin_dashboard)" />
      <Stack.Screen name="(user_dashboard)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
         <KeyboardProvider>
        <GestureHandlerRootView>
          <StatusBar
            animated
            backgroundColor={colors.dark.background}
            barStyle="light-content"
          />
          <RootLayoutNav />
                <ToastManager config={toastConfig} />
        </GestureHandlerRootView>
        </KeyboardProvider>
      </QueryClientProvider>
    </Provider>
  );
}
