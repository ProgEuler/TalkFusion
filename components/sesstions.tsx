import colors from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Button } from "./ui/Button";
import { FlashList } from "@shopify/flash-list";
import { useGetSessionsQuery } from "@/api/user-api/sessions.api";
import { timeAgo } from "@/utils/helpers";

type Session = {
  session_id: string;
  device: string;
  browser: string;
  ip: string;
  location?: string | null;
  last_active: string | number | Date;
};

export default function Sessions() {
  const { data: sessions = [], isLoading, isError } = useGetSessionsQuery(undefined);

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

  if (isError || !sessions?.length) {
    return (
      <View style={styles.card}>
        <View style={styles.divider} />
        <Text style={styles.emptyText}>
          {isError ? "Failed to load sessions" : "No active sessions"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>

      <FlashList
        data={sessions}
        renderItem={({ item }: { item: Session }) => (
         <>
          <View key={item.session_id} style={styles.sessionItem}>
            <View style={styles.sessionInfo}>
              <View>
                <Text style={styles.sessionDevice}>
                  {item.device || "Unknown device"} • {item.browser || "Unknown browser"}
                </Text>
                {/* {item.is_current && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Current Session</Text>
                  </View>
                )} */}
              </View>

              <Button variant="destructive_outline" size="sm">
                Logout
              </Button>
            </View>

            <Text style={styles.sessionDetails}>
              {item.ip} • {item.location || "Unknown location"} • {timeAgo(item.last_active)}
            </Text>
          </View>
                <View style={styles.divider} />
          </>

        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        scrollEnabled={false}
      />

      <Button variant="outline" style={{ marginTop: 8 }}>
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
