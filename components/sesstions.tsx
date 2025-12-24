import {
  useGetSessionsQuery,
  useLogOutAllMutation,
  useLogOutOtherDeviceMutation,
} from "@/api/user-api/sessions.api";
import colors from "@/constants/colors";
import { selectSessionId } from "@/store/authSlice";
import { timeAgo } from "@/utils/helpers";
import { FlashList } from "@shopify/flash-list";
import { RefreshCw } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { toast } from "sonner-native";
import ErrorScreen from "./ErrorScreen";
import { Button } from "./ui/Button";

type Session = {
  session_id: number;
  device: string;
  browser: string;
  ip: string;
  location?: string | null;
  last_active: string | number | Date;
};

export default function Sessions() {
  const {
    data: sessions = [],
    isLoading,
    isError,
    refetch,
  } = useGetSessionsQuery(undefined);
  const session_id = useSelector(selectSessionId);
  const [logoutOther, { isLoading: logginOutOther }] =
    useLogOutOtherDeviceMutation();
  const [logOutAll] = useLogOutAllMutation();

  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.divider} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.dark.primary} />
        </View>
      </View>
    );
  }

  if (isError) return <ErrorScreen onRetry={refetch} />;

  if (!sessions?.length) {
    return (
      <View style={styles.card}>
        <View style={styles.divider} />
        <Text style={styles.emptyText}>No active sessions</Text>
      </View>
    );
  }

  const logoutOtherDevice = async (item: Session) => {
    try {
      await logoutOther({ id: item.session_id });
      refetch();
      toast.success(`logged out from ${item.device}`);
    } catch (error) {
      // console.log(error)
      toast.error(`Failed to logout from ${item.session_id}`);
    }
  };

  const logoutAll = async () => {
    try {
      await logOutAll("");
      toast.success("Logged out from all device");
    } catch (error) {
      // console.log(error)
      toast.error("Failed to logout from all device");
    }
  };

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Sessions</Text>
        <TouchableOpacity onPress={refetch}>
          <RefreshCw color={"#fff"} size={20} />
        </TouchableOpacity>
      </View>

      <FlashList
        data={sessions}
        renderItem={({ item }: { item: Session }) => (
          <>
            <View key={item.session_id} style={styles.sessionItem}>
              <View style={styles.sessionInfo}>
                <View>
                  <Text style={styles.sessionDevice}>
                    {item.device || "Unknown device"} •{" "}
                    {item.browser || "Unknown browser"}
                  </Text>
                </View>
                {session_id === item.session_id && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Current Device</Text>
                  </View>
                )}
              </View>

              <Text style={styles.sessionDetails}>
                {item.ip} • {item.location || "Unknown location"} •{" "}
                {timeAgo(item.last_active)}
              </Text>
              {session_id !== item.session_id && (
                <Button
                  onPress={() => logoutOtherDevice(item)}
                  variant="destructive_outline"
                  size="sm"
                  style={{ marginTop: 8, width: "20%"}}
                >
                  Logout
                </Button>
              )}
            </View>
            <View style={styles.divider} />
          </>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        scrollEnabled={false}
      />

      <Button onPress={logoutAll} variant="outline" style={{ marginTop: 8 }}>
        Logout from all other devices
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 16,
    borderColor: "#2c2c2e",
  },
  divider: {
    height: 1,
    backgroundColor: "#2c2c2e",
    marginTop: 12,
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#8e8e93",
    fontSize: 14,
    paddingVertical: 20,
  },
  sessionItem: {
    marginBottom: 6,
  },
  sessionInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  sessionDevice: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  currentBadge: {
    backgroundColor: "#1e4d2b",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  currentBadgeText: {
    color: "#32d74b",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  sessionDetails: {
    fontSize: 13,
    color: "#8e8e93",
    lineHeight: 18,
  },
});
