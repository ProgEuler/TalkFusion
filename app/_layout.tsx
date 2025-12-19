import colors from "@/constants/colors";
import { hydrate } from "@/store/authSlice";
import { store } from "@/store/store";
import { getAuthData } from "@/utils/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider, useDispatch } from "react-redux";
import ToastManager from 'toastify-react-native';
import { Toaster } from 'sonner-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// Custom toast configuration
const toastConfig = {
  success: (props: any) => (
    <View style={{ backgroundColor: colors.dark.primary, padding: 16, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
    </View>
  ),
  error: (props: any) => (
    <View style={{ backgroundColor: colors.dark.danger, padding: 16, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
    </View>
  ),
  // Override other toast types as needed
}

function RootLayoutNav() {
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const authData = await getAuthData();
        if (authData) {
          dispatch(hydrate({
            user: authData.user,
            token: authData.accessToken,
            refreshToken: authData.refreshToken,
            session_id: authData.sessionId,
          }));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [dispatch]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerBackTitle: "Back", headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(admin_dashboard)" />
      <Stack.Screen name="(user_dashboard)" />
      <Stack.Screen name="add-appointment" options={{ presentation: 'card', headerShown: true, title: 'Add Appointment' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
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
            <Toaster />
            <ToastManager config={toastConfig} position="bottom" />
          </GestureHandlerRootView>
        </KeyboardProvider>
      </QueryClientProvider>
    </Provider>
  );
}
