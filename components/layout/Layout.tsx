import colors from "@/constants/colors";
import React, { ReactNode } from "react";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

type Props = {
  stickyIndex?: number[];
  children: ReactNode;
  edges?: SafeAreaViewProps["edges"];
  scrollable?: boolean;
  noPadding?: boolean;
  avoidTabbar?: boolean;
  avoidKeyboard?: boolean;
  onScroll?: (event: any) => void;
} & SafeAreaViewProps;

function Layout({
  scrollable = false,
  stickyIndex = [],
  children,
  edges = [],
  className,
  avoidTabbar = false,
  noPadding = false,
  avoidKeyboard = false,
  onScroll,
  ...props
}: Props) {
  const padding = {
    top: edges.toString().includes("top") ? 0 : noPadding ? 0 : 24,
    horizontal: noPadding ? 0 : 12,
    bottom: noPadding ? 0 : 24,
    tabbarOffset: 24,
    keyboardBottomOffset: 20,
  };

  const getBottomPadding = (isContentContainer: boolean = false) => {
    if (avoidTabbar) {
      return isContentContainer ? padding.tabbarOffset : padding.bottom;
    }

    return isContentContainer ? 0 : padding.bottom;
  };

  const scrollViewProps = {
    onScroll,
    stickyHeaderIndices: stickyIndex,
    showsVerticalScrollIndicator: false,
    keyboardDismissMode: "on-drag" as const,
    style: {
      flex: 1,
      paddingTop: padding.top,
      paddingHorizontal: padding.horizontal,
      paddingBottom: scrollable ? 0 : getBottomPadding(),
    },
  };

  const commonContentContainerStyle = {
    flexGrow: 1,
    gap: 12,
    paddingBottom: getBottomPadding(true),
  };

  const safeAreaViewProps = {
    edges,
    ...props,
  };

  if (scrollable) {
    return (
      <ScrollView
        {...scrollViewProps}
        contentContainerStyle={commonContentContainerStyle}
        style={{
          backgroundColor: colors.dark.background,
          flex: 1,
          padding: 16,
        }}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <SafeAreaView
      {...safeAreaViewProps}
      style={{
        gap: 12,
        paddingTop: padding.top,
        paddingHorizontal: padding.horizontal,
        paddingBottom: getBottomPadding(),
      }}
    >
      {children}
    </SafeAreaView>
  );
}

export default Layout;
