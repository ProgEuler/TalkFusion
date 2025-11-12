import React, { ReactNode } from "react";
import { View } from "react-native";
import SafeArea from "./SafeArea";
import KeyboardAvoidingScrollView from "./KeyboardAvoidingScrollView";

type Props = {
  children: ReactNode;
  scrollable?: boolean;
  noPadding?: boolean;
};

export default function Layout({
  children,
  scrollable = false,
  noPadding = false,
}: Props) {
  if (scrollable) {
    return (
      <SafeArea>
        <KeyboardAvoidingScrollView
          contentContainerStyle={{
            padding: noPadding ? 0 : 16,
          }}
        >
          {children}
        </KeyboardAvoidingScrollView>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <View
        style={{
          flex: 1,
          padding: noPadding ? 0 : 16,
        }}
      >
        {children}
      </View>
    </SafeArea>
  );
}
