import {
    useBotActiveQuery,
    useDisConnectMutation,
    useGetFbUrlQuery,
    useGetIgUrlQuery,
    useGetWpUrlQuery,
} from "@/api/user-api/integrations.api";
import Fb from "@/assets/svgs/facebook.svg";
import Ig from "@/assets/svgs/instagram.svg";
import Wp from "@/assets/svgs/whatsapp.svg";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { selectChannelStatus } from "@/store/channelSlice";
import { useRouter } from "expo-router";
import { Calendar } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    Linking,
    RefreshControl,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import { toast } from "sonner-native";
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  url: string;
  bot?: boolean;
}

export default function IntegrationsScreen() {
  const router = useRouter();
  const channel = useSelector(selectChannelStatus);
  const {
    data: fbUrl,
    isLoading: fbUrlLoading,
    error: fbError,
    refetch: refetchFb,
    isFetching,
  } = useGetFbUrlQuery(undefined);
  const {
    data: wpUrl,
    isLoading: wpUrlLoading,
    error: wpError,
    refetch: refetchWp,
    isFetching: isFetchingWp,
  } = useGetWpUrlQuery(undefined);

  const {
    data: igUrl,
    isLoading: igUrlLoading,
    error: igError,
    refetch: refetchIg,
  } = useGetIgUrlQuery(undefined);

  const { data: fbBot } = useBotActiveQuery({ platform: "facebook" });
  const { data: wpBot } = useBotActiveQuery({ platform: "whatsapp" });

  const [botStatus, setBotStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (fbBot || wpBot) {
      setBotStatus({
        facebook: fbBot?.bot_active ?? false,
        whatsapp: wpBot?.bot_active ?? false,
      });
    }
  }, [fbBot, wpBot]);

  const [disconnectBot, { isLoading }] = useDisConnectMutation();

  if (fbUrlLoading || igUrlLoading || wpUrlLoading) return <LoadingSpinner />;
  if (fbError || igError || wpError)
    return (
      <ErrorScreen
        onRetry={() => {
          refetchFb();
          refetchWp()
          refetchIg();
        }}
      />
    );

  const integrations: Integration[] = [
    {
      id: "facebook",
      name: "Facebook Messenger",
      description: "Connect to collaborate easily",
      icon: <Fb color={colors.dark.primary} />,
      connected: channel.facebook,
      url: fbUrl.redirect_url,
      bot: botStatus.facebook,
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Connect for ultimate reach",
      icon: <Wp color={colors.dark.primary} />,
      connected: channel.whatsapp,
      url: wpUrl.redirect_url,
      bot: botStatus.whatsapp,
    },
    {
      id: "instagram",
      name: "Instagram DM",
      description: "Connect to transform replies",
      icon: <Ig color={colors.dark.primary} />,
      connected: channel.instagram,
      url: igUrl.redirect_url,
      bot: false,
    },
    {
      id: "calendar",
      name: "Calendar",
      description: "Connect to automate Booking",
      icon: <Calendar color={colors.dark.primary} />,
      connected: channel.calendar,
      url: fbUrl.redirect_url,
    },
  ];

  const handleConnect = async (
    integrationId: string,
    integrationUrl: string
  ) => {
    try {
      await Linking.openURL(integrationUrl);
      toast.success(`${integrationId} connected successfully!`);
    } catch (error) {
      toast.error(`Failed to connect ${integrationId}.`);
      return;
    }
  };

  const handleToggleBot = async (
    integrationId: string,
    currentStatus: boolean
  ) => {
    try {
      await disconnectBot({
        platform: integrationId,
        bot_active: !currentStatus,
      }).unwrap();
      setBotStatus((prev) => ({
        ...prev,
        [integrationId]: !currentStatus,
      }));
      toast.success(
        `Bot ${!currentStatus ? "activated" : "deactivated"} for ${integrationId}`
      );
    } catch (error: any) {
      console.log("Toggle bot error:", error);
      const errorMessage = Array.isArray(error?.data)
        ? error.data[0]
        : error?.data?.message || `Failed to update bot status for ${integrationId}`;

      toast.error(errorMessage);
    }
  };

  return (
    <Layout
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetchFb} />
      }
    >
      <Text style={{ color: colors.dark.textSecondary, padding: 8 }}>
        Link your business accounts to manage messages and posts from on
        ecentralized hub.
      </Text>
      <View style={styles.grid}>
        {integrations.map((integration) => (
          <View key={integration.id} style={styles.card}>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <View style={styles.cardHeader}>
                <View>{integration.icon}</View>
              </View>
              <View>
                <Text style={styles.cardTitle}>{integration.name}</Text>
                <Text style={styles.cardDescription}>
                  {integration.description}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
               {
                  integration.id !== "calendar" ?
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Text style={{ color: "#fff" }}>Bot status</Text>
                <Switch
                  value={integration.bot}
                  onValueChange={() =>
                    handleToggleBot(integration.id, integration.bot ?? false)
                  }
                  trackColor={{ false: "#374151", true: colors.dark.primary }}
                  thumbColor="#FFFFFF"
                  // disabled={!integration.connected}
                />
              </View> : <View></View>
               }
              <Button
                size="sm"
                style={{ height: 36 }}
                variant={integration.connected ? "destructive" : "primary"}
                onPress={() => handleConnect(integration.id, integration.url)}
                testID={`connect-${integration.id}`}
               //  disabled={integration.connected}
              >
                {integration.connected ? "connected" : "Connect"}
              </Button>
            </View>
            {integration.id === "facebook" && (
                <Button
                    size="sm"
                    variant="outline"
                    onPress={() => router.push("/(user_dashboard)/facebook-pages")}
                    style={{ marginTop: 8 }}
                >
                    Manage Pages
                </Button>
            )}
          </View>
        ))}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  grid: {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 14,
    justifyContent: "space-between" as const,
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between" as const,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    gap: 12
  },
  cardHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: colors.dark.text,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
  connectButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  connectButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600" as const,
  },
});
