import { useSafeAreaWithKeyboard } from "@/hooks/use-safe-area-keyboard";
import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

/**
 * Component that adds safe area padding at the bottom, 
 * accounting for Android gesture navigation
 */
export function SafeBottomArea({ children, style }: Props) {
  const { buttonContainerPaddingBottom } = useSafeAreaWithKeyboard();
  
  return (
    <View
      style={[
        {
          paddingBottom: buttonContainerPaddingBottom,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}