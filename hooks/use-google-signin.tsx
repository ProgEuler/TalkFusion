import { useGoogleSigninMutation } from "@/api/auth.api";
import { setCredentials } from "@/store/authSlice";
import { saveAuthData } from "@/utils/storage";
import {
   GoogleSignin,
   isErrorWithCode,
   isSuccessResponse,
   statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner-native";

export function useSignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const [GoogleLogin, { isLoading }] = useGoogleSigninMutation(undefined);

  const signIn = async (method: "signin" | "signout") => {
    try {
      setInProgress(true);
      if (method === "signout") {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();
        setName(null);
        return;
      }
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();

      console.log(accessToken)

      const res = await GoogleLogin({ access_token: accessToken }).unwrap();

      if (isSuccessResponse(response)) {
        await dispatch(
          setCredentials({
            user: res.user,
            plan: res.plan,
            token: res.access,
            refreshToken: res.refresh,
            session_id: res.session_id,
          })
        );

        await saveAuthData({
          accessToken: res.access,
          refreshToken: res.refresh,
          user: res.user,
          sessionId: res.session_id,
          plan: res.plan,
        });

        toast.success("Login successful");
        setName(res.user.name);

        if (res.user.role === "admin") {
          router.replace("/(admin_dashboard)/home");
        } else if (res.plan) {
          router.replace("/(user_dashboard)/home");
        } else {
          router.replace("/(auth)/welcome");
        }
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.error("Sign-In already in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error("Play services not available or outdated");
            break;
          default:
            toast.error("Login failed");
        }
      } else {
        toast.error("Login failed");
      }
    } finally {
      setInProgress(false);
    }
  };

  return { name, signIn, loading: isLoading || inProgress };
}
