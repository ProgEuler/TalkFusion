import colors from "@/constants/colors";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.dark.background,
        },
        headerTintColor: "#fff",
        headerTitle: "",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false, // Removes bottom border on iOSr
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="create-new-password" />
    </Stack>
  );
};

export default Layout;
