import { Button } from "@/components/ui/Button";
import { OTPFields } from "@/components/ui/otp-input";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpVerificationScreen() {
  const router = useRouter();

  const handleVerifyOtp = () => {
    router.push("/(auth)/create-new-password");
  };

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>
              Enter the 4-digit code sent to your email address.
            </Text>

            <OTPFields
              numberOfDigits={4}
              onChange={(v) => {
                console.log("OTP Code:", v);
              }}
            />

            <View style={{ flex: 1, gap: 16, marginTop: 26 }}>
              <Button onPress={handleVerifyOtp}>Verify Code</Button>

              <Button variant="outline">Resend Code</Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#A0A0A0",
    textAlign: "center",
    marginBottom: 48,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 48,
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: "#787880",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24,
    color: "#FFFFFF",
  },
  verifyButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600" as const,
  },
  resendButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  resendButtonText: {
    color: colors.dark.primary,
    fontSize: 16,
    fontWeight: "500" as const,
  },
  backToLoginButton: {
    alignItems: "center",
  },
  backToLoginButtonText: {
    color: colors.dark.primary,
    fontSize: 16,
    fontWeight: "500" as const,
  },
});
