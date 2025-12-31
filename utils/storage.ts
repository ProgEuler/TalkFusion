import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_DATA_KEY = 'auth_user_data';
const SESSION_ID_KEY = 'auth_session_id';
const PLAN_KEY = 'auth_plan_data';

export const saveAuthData = async (data: {
  accessToken: string;
  refreshToken?: string;
  user: any;
  sessionId?: number;
  plan?: boolean;
}) => {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
    if (data.refreshToken) {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refreshToken);
    }
    await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.user));
    if (data.sessionId) {
      await SecureStore.setItemAsync(SESSION_ID_KEY, data.sessionId.toString());
    }
    if (data.plan !== undefined) {
      await SecureStore.setItemAsync(PLAN_KEY, data.plan.toString());
    }
  } catch (error) {
    console.error('Error saving auth data to SecureStore:', error);
  }
};

export const getAuthData = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
    const sessionId = await SecureStore.getItemAsync(SESSION_ID_KEY);
    const plan = await SecureStore.getItemAsync(PLAN_KEY);

    return {
      accessToken,
      refreshToken,
      user: userData ? JSON.parse(userData) : null,
      sessionId: sessionId ? parseInt(sessionId, 10) : null,
      plan: plan === 'true',
    };
  } catch (error) {
    console.error('Error getting auth data from SecureStore:', error);
    return null;
  }
};

export const clearAuthData = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_DATA_KEY);
    await SecureStore.deleteItemAsync(SESSION_ID_KEY);
    await SecureStore.deleteItemAsync(PLAN_KEY);
  } catch (error) {
    console.error('Error clearing auth data from SecureStore:', error);
  }
};

export const updateAccessToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error updating access token in SecureStore:', error);
  }
};
