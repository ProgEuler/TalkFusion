import { Redirect } from "expo-router";
import React from "react";

export default function IndexScreen() {
  return <Redirect href="/(user_dashboard)/chat-detail" />;
}
