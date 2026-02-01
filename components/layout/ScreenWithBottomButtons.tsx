import colors from "@/constants/colors";
import { useSafeAreaWithKeyboard } from "@/hooks/use-safe-area-keyboard";
import { ReactNode } from "react";
import { Platform, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
    SafeAreaView,
    SafeAreaViewProps,
} from "react-native-safe-area-context";

type Props = {
  children?: ReactNode;
  bottomButtons?: ReactNode;
  stickyHeaderIndices?: number[];
  refreshControl?: React.ReactElement<any>;
  contentStyle?: ViewStyle;
} & SafeAreaViewProps;

/**
 * Layout component specifically designed for screens with fixed bottom buttons
 * Handles Android gesture navigation properly
 */
export function ScreenWithBottomButtons({ 
  children, 
  bottomButtons, 
  style, 
  contentStyle,
  refreshControl, 
  ...props 
}: Props) {
  const padding = 12;
  const { buttonContainerPaddingBottom } = useSafeAreaWithKeyboard();
  
  return (
    <SafeAreaView
      edges={props.edges || ['top', 'left', 'right']}
      style={{
        flex: 1,
        backgroundColor: colors.dark.background,
      }}
      {...props}
    >
      <View style={{ flex: 1, paddingHorizontal: padding }}>
        <KeyboardAwareScrollView
          stickyHeaderIndices={props.stickyHeaderIndices}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardDismissMode="interactive"
          bottomOffset={Platform.OS === 'android' ? 80 : 60} // Extra space for bottom buttons
          refreshControl={refreshControl}
          contentContainerStyle={[
            {
              flexGrow: 1,
              gap: 8,
              paddingTop: padding,
              paddingBottom: bottomButtons ? 80 : padding, // Space for fixed buttons
            },
            contentStyle,
          ]}
        >
          {children}
        </KeyboardAwareScrollView>
        
        {bottomButtons && (
          <View
            style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: colors.dark.background,
                paddingHorizontal: padding,
                paddingTop: 12,
                paddingBottom: buttonContainerPaddingBottom,
                borderTopWidth: 1,
                borderTopColor: colors.dark.border,
                gap: 12,
              },
              style,
            ]}
          >
            {bottomButtons}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}