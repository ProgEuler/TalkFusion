import { useGoogleSigninMutation } from "@/api/auth.api";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";

export function useSignIn() {
  const [name, setName] = useState<string | null>(null);
  const [GoogleLogin, {isLoading}] = useGoogleSigninMutation(undefined)

  if(isLoading) return <LoadingSpinner />

  const signIn = async (method: "signin" | "signout") => {
    try {
      if (method === "signout") {
        await GoogleSignin.hasPlayServices();
        const res = GoogleSignin.signOut();
        setName(null);
        console.log(res);
        return;
      }
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      console.log(token);
      GoogleLogin(token)

      if (isSuccessResponse(response)) {
        console.log({ userInfo: response.data });
        setName(response.data.user.name);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return { name, signIn };
}
