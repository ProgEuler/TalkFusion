import { selectCurrentUser } from "@/store/authSlice";
import { Redirect } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";
import "../global.css"
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function IndexScreen() {
  const user = useSelector(selectCurrentUser);
  return (
    <Redirect
      href={
        user?.role
          ? user.role === "admin"
            ? "/(admin_dashboard)/home"
            : "/(user_dashboard)/appointments"
          : "/(auth)/login"
      }
    />
  );
}
