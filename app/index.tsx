import { selectCurrentUser } from "@/store/authSlice";
import { Redirect } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";
import "../global.css"
import { LogBox } from "react-native";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import NetInfo from '@react-native-community/netinfo';

NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
});

LogBox.ignoreAllLogs();

if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
    //  sound: true,
  });
}

export default function IndexScreen() {
  const user = useSelector(selectCurrentUser);
  return (
    <Redirect
      href={
        user?.role
          ? user.role === "admin"
            ? "/(admin_dashboard)/home"
            : "/(user_dashboard)/home"
          : "/(auth)/login"
      }
    />
  );
}
