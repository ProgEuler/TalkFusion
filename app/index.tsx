import { selectCurrentPlan, selectCurrentUser } from "@/store/authSlice";
import NetInfo from "@react-native-community/netinfo";
import * as NavigationBar from "expo-navigation-bar";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { useSelector } from "react-redux";
import "../global.css";

NavigationBar.setButtonStyleAsync('light');

NetInfo.fetch().then((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

LogBox.ignoreAllLogs();
export default function IndexScreen() {
  const user = useSelector(selectCurrentUser);
  const plan = useSelector(selectCurrentPlan);

//   useEffect(() => {
//    //  NavigationBar.setBackgroundColorAsync("transparent");
//     NavigationBar.setButtonStyleAsync("dark"); // 'light' | 'dark'
//     NavigationBar.setPositionAsync("absolute");
//   }, []);

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
