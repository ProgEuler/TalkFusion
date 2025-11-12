import React, { ReactNode } from "react";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import colors from "@/constants/colors";

type Props = {
  children: ReactNode;
} & SafeAreaViewProps;

export default function SafeArea({ children, ...props }: Props) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.dark.background,
      }}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}
