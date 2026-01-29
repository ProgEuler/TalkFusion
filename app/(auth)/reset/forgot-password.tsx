import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import colors from "@/constants/colors";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const location = usePathname()
  const [email, setEmail] = useState<string>("");

  const handleSendOtp = () => {
    router.push({
      pathname: "/(auth)/signup/otp-verification",
      params: { email, from: location },
    });
  };

  return (
    <Layout>
      <View style={styles.scrollContent}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email address to receive a verification code.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={{ flexDirection: "column", gap: 12 }}>
            <Button onPress={handleSendOtp}>Send Verification Code</Button>
            <Button
              variant="outline"
              onPress={() => router.replace("/(auth)/login")}
            >
              Back to Login
            </Button>
          </View>
        </View>
      </View>
    </Layout>
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
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#787880",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
  },
  sendOtpButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  sendOtpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600" as const,
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
