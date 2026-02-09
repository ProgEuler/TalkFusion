import colors from "@/constants/colors";
import { hydrate, selectCurrentToken } from "@/store/authSlice";
import { store } from "@/store/store";
import { getAuthData } from "@/utils/storage";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Toaster } from 'sonner-native';
import ToastManager from 'toastify-react-native';

import { ErrorBoundary } from "@/components/ErrorBoundary";
import NetworkAlert from "@/components/NetworkAlert";

// Global Error Handling
if (!__DEV__) {
  // Global JS error handler
  const defaultHandler = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.error('Global Error:', error, isFatal);
    // You could send this to a logging service here
    if (defaultHandler) {
      defaultHandler(error, isFatal);
    }
  });

  // Unhandled Promise rejection tracker
  require('promise/lib/rejection-tracking').enable({
    all: true,
    onUnhandled: (id: string, error: any) => {
      console.error('Unhandled Promise Rejection:', id, error);
    },
  });
}


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
  const router = useRouter();
  const segments = useSegments();
  const token = useSelector(selectCurrentToken);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const authData = await getAuthData();
        if (authData) {
          dispatch(hydrate({
            user: authData.user,
            plan: authData.plan,
            token: authData.accessToken,
            refreshToken: authData.refreshToken,
            session_id: authData.sessionId,
          }));
        } else {
          dispatch(hydrate({
            user: null,
            plan: null,
            token: null,
            refreshToken: null,
            session_id: null,
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

  // Handle navigation when user logs out
  useEffect(() => {
    if (!appIsReady) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    // If token is null and not in auth group, navigate to login
    if (!token && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [token, segments, appIsReady]);

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
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <StatusBar
                animated
                backgroundColor={colors.dark.background}
                barStyle="light-content"
              />
              <ErrorBoundary>
                <RootLayoutNav />
              </ErrorBoundary>
              <NetworkAlert />
              <Toaster
                 position="bottom-center"
                 swipeToDismissDirection="left"
                 richColors
                 toastOptions={{
                    style: {
                       borderWidth: 0,
                     },
                     success: { backgroundColor: colors.dark.primary },
                     warning: { backgroundColor: colors.dark.warning },
                     error: { backgroundColor: colors.dark.danger },
                     titleStyle: { color: "#fff" }
                 }}
              />
              <ToastManager config={toastConfig} position="bottom" />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </KeyboardProvider>
      </QueryClientProvider>
    </Provider>
  );
}
