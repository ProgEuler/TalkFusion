import { useLoginMutation } from "@/api/auth.api";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { useSignIn } from "@/hooks/use-google-signin";
import { isValidEmail } from "@/utils/validation";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

GoogleSignin.configure({
  scopes: [],
  offlineAccess: false,
  iosClientId: process.env.EXPO_PUBLIC_IOS_OAUTH_TOKEN,
  forceCodeForRefreshToken: true,
});

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, name } = useSignIn();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [emailError, setEmailError] = useState<string | null>(null);

  const [login, { isLoading: loading }] = useLoginMutation();

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const handleLogin = async () => {
    if (loading) return;

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);
    try {
      const res = await login({
        email: email.toLowerCase(),
        password,
      }).unwrap();
      // console.log(res);
      showToast("Login successful!", "success");
      setTimeout(() => {
        router.replace("/(user_dashboard)/home");
      }, 1000);
    } catch (error: any) {
      // console.error("Error:", error.data);
      const message =
        error?.data?.non_field_errors[0] || "Login failed. Please try again.";
      showToast(message, "error");
    }
  };

  const handleGoogleLogin = () => {
    console.log("google signin clicked");
    signIn("signin");
  };

  return (
    <Layout>
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={() => setToastVisible(false)}
      />
      <View style={styles.scrollContent}>
        <Text style={styles.title}>Welcome Back!</Text>

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
            {emailError && (
              <Text style={{ color: "red", padding: 4 }}>{emailError}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#A0A0A0" />
                ) : (
                  <Eye size={20} color="#A0A0A0" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push("/(auth)/reset/forgot-password")}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button onPress={handleLogin} isLoading={loading}>
            Login
          </Button>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <Button variant="outline" onPress={handleGoogleLogin}>
              Continue with Google
            </Button>
            <Button variant="outline">Continue with Apple</Button>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#1C1C1E",
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
  },
  title: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 48,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 10,
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
  passwordContainer: {
    backgroundColor: "#787880",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 0,
    marginBottom: 18,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#0A84FF",
    fontWeight: "500" as const,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#3A3A3C",
  },
  dividerText: {
    color: "#A0A0A0",
    fontSize: 14,
    marginHorizontal: 16,
  },
  socialButtons: {
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3A3A3C",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500" as const,
  },
  loginButton: {
    backgroundColor: "#0A84FF",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600" as const,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#A0A0A0",
    fontSize: 14,
  },
  signupLink: {
    color: "#0A84FF",
    fontSize: 14,
    fontWeight: "500" as const,
  },
});
