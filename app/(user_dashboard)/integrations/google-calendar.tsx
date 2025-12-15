import { useGetCalendarUrlMutation } from "@/api/user-api/integrations.api";
import Google from "@/assets/svgs/Google_Calendar.svg";
import { Button } from "@/components/ui/Button";
import colors from "@/constants/colors";
import { selectChannelStatus } from "@/store/channelSlice";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";

export default function GoogleCalendar() {
  const [getUrl, { isLoading }] = useGetCalendarUrlMutation({});
  const channel = useSelector(selectChannelStatus);
  //   console.log("channel status from google screen", channel)

  const handleConnect = async () => {
    try {
      const res = await getUrl({ from: "app" });
      // console.log("Integration response:", res);
      await Linking.openURL(res.data.auth_url);
      Toast.success("Google Calendar connected successfully!");
    } catch (error) {
      Toast.error("Failed to connect Google Calendar.");
      // console.log("Error connecting to Google Calendar:", error);
      return;
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "600", color: colors.dark.text }}
        >
          Calendar Integration
        </Text>
        <Text style={styles.autoSyncText}>Auto-sync enabled</Text>
      </View>
      <View style={styles.integrationCard}>
        <Google width={48} height={48} />
        <View style={styles.integrationInfo}>
          <Text style={styles.integrationName}>Google Calendar</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              size="sm"
              variant={channel.calendar ? "destructive" : "primary"}
              onPress={handleConnect}
              style={styles.connectButton}
              isLoading={isLoading}
              disabled={channel.calendar}
            >
              {channel.calendar ? "connected" : "Connect"}
            </Button>
            {/* <Button size="sm" style={styles.connectButton}>
              Disconnected
            </Button> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appointmentsList: {
    gap: 8,
  },
  appointmentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    gap: 12,
  },
  appointmentTime: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    width: 80,
  },
  appointmentName: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
    flex: 1,
  },
  autoSyncText: {
    fontSize: 14,
    color: colors.dark.primary,
    fontWeight: "500",
  },
  integrationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
    gap: 16,
  },
  googleLogoText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
  },
  integrationInfo: {
    flex: 1,
  },
  integrationName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 8,
  },
  connectButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    //  backgroundColor: colors.dark.primary,
  },
  connectButtonText: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "600",
  },
});
