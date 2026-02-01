import colors from "@/constants/colors";
import { useSafeAreaWithKeyboard } from "@/hooks/use-safe-area-keyboard";
import { ReactNode } from "react";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

type Props = {
  children?: ReactNode;
  stickyHeaderIndices?: number[];
  refreshControl?: React.ReactElement<any>;
} & SafeAreaViewProps;

export function Layout({ children, style, refreshControl, ...props }: Props) {
  const padding = 12;
  const { contentPaddingBottom } = useSafeAreaWithKeyboard();

  return (
    <SafeAreaView
      edges={props.edges || []}
      style={{
        flex: 1,
        backgroundColor: colors.dark.background,
        paddingHorizontal: padding,
      }}
      {...props}
    >
      <KeyboardAwareScrollView
        stickyHeaderIndices={props.stickyHeaderIndices}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="interactive"
        bottomOffset={Platform.OS === 'android' ? 40 : 20}
        refreshControl={refreshControl}
        contentContainerStyle={[
          {
            flexGrow: 1,
            gap: 8,
            paddingBottom: contentPaddingBottom,
            paddingTop: padding,
          },
          style,
        ]}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
