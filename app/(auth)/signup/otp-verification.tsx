import { useGetOtpMutation, useVerifyOtpMutation } from "@/api/auth.api";
import { Button } from "@/components/ui/Button";
import { OTPFields } from "@/components/ui/otp-input";
import { Toast } from "@/components/ui/Toast";
import colors from "@/constants/colors";
import { setCredentials } from "@/store/authSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function OtpVerificationScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading: verifyingOTP }] =
    useVerifyOtpMutation(undefined);
  const [resendOtp, { isLoading: resending }] = useGetOtpMutation(undefined);

  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const [timer, setTimer] = useState<number>(180);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [getOtp, { isLoading: sendingOTP }] = useGetOtpMutation(undefined);

  React.useEffect(() => {
    getOtp({ email });
  }, [email]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const handleVerifyOtp = async () => {
    console.log(otp);
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      dispatch(
        setCredentials({
          user: res.user,
          plan: res.plan,
          token: res.access,
          refreshToken: res.refresh,
          session_id: res.session_id,
        })
      );
      showToast("OTP Verified Successfully!", "success");
      setTimeout(() => {
        router.replace("/(auth)/login");
        router.replace("/(auth)/login");
      }, 1000);
      // Navigate to next screen or dashboard
      // router.push("/(auth)/create-new-password");
    } catch (error: any) {
      console.log(error);
      const message = error?.data?.message || "Invalid OTP. Please try again.";
      showToast(message, "error");
    }
  };

  const resend = async () => {
    if (!canResend) return;
    try {
      await resendOtp(email).unwrap();
      showToast("OTP Resent Successfully!", "success");
      setTimer(180);
      setCanResend(false);
    } catch (error: any) {
      console.log(error);
      const message = error?.data?.message || "Failed to resend OTP.";
      showToast(message, "error");
    }
  };

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Toast
          visible={toastVisible}
          message={toastMessage}
          type={toastType}
          onHide={() => setToastVisible(false)}
        />
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
              Enter the 4-digit code sent to{" "}
              {"\n" + email || "your email address"}
            </Text>

            <OTPFields
              numberOfDigits={4}
              onChange={(v) => {
                setOtp(v);
              }}
            />

            <View style={{ flex: 1, gap: 16, marginTop: 26 }}>
              <Button onPress={handleVerifyOtp} isLoading={verifyingOTP}>
                Verify Code
              </Button>

              <Button
                onPress={resend}
                variant="outline"
                disabled={!canResend || resending}
                isLoading={resending}
              >
                {canResend
                  ? "Resend Code"
                  : `Resend Code (${formatTime(timer)})`}
              </Button>
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
