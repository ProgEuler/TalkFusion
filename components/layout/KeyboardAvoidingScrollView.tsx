import React, { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollViewProps } from "react-native";

type Props = {
  children: ReactNode;
} & ScrollViewProps;

export default function KeyboardAvoidingScrollView({
  children,
  ...props
}: Props) {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
