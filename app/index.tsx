import { selectCurrentPlan, selectCurrentUser } from "@/store/authSlice";
import NetInfo from '@react-native-community/netinfo';
import * as Notifications from "expo-notifications";
import { Redirect } from "expo-router";
import React from "react";
import { LogBox, Platform } from "react-native";
import { useSelector } from "react-redux";
import "../global.css";

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
  const plan = useSelector(selectCurrentPlan);

  return (
    <Redirect
      href={
        user?.role
          ? user.role === "admin"
            ? "/(admin_dashboard)/home"
            : plan
            ? "/(user_dashboard)/home"
            : "/(auth)/welcome"
          : "/(auth)/login"
      }
    />
  );
}
