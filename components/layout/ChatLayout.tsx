import colors from "@/constants/colors";
import { useSafeAreaWithKeyboard } from "@/hooks/use-safe-area-keyboard";
import { ReactNode } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  header?: ReactNode;
  inputToolbar?: ReactNode;
  headerHeight?: number;
};

/**
 * Specialized layout for chat screens with proper keyboard avoidance
 */
export function ChatLayout({ 
  children, 
  header, 
  inputToolbar, 
  headerHeight = 60 
}: Props) {
  const insets = useSafeAreaInsets();
  const { buttonContainerPaddingBottom } = useSafeAreaWithKeyboard();
  
  // Calculate keyboard offset based on header and safe area
  const keyboardVerticalOffset = Platform.select({
    ios: insets.top + headerHeight,
    android: 0,
  }) || 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {header}
      
      <View style={styles.messagesContainer}>
        {children}
      </View>
      
      {inputToolbar && (
        <View
          style={[
            styles.inputContainer,
            {
              paddingBottom: Platform.OS === 'android' 
                ? buttonContainerPaddingBottom 
                : insets.bottom + 8,
            },
          ]}
        >
          {inputToolbar}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
});