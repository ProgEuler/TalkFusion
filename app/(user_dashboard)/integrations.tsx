import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import colors from "@/constants/colors";
import {
  Calendar,
  Instagram,
  MessageCircle,
  MessageSquare,
  Zap,
} from "lucide-react-native";
import React from "react";
import {
   Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
}

export default function IntegrationsScreen() {
  const integrations: Integration[] = [
    {
      id: "facebook",
      name: "Facebook Messenger",
      description: "Connect to collaborate easily",
      icon: <MessageCircle color={colors.dark.primary} size={28} />,
      connected: false,
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Connect for ultimate reach",
      icon: <MessageSquare color={colors.dark.primary} size={28} />,
      connected: false,
    },
    {
      id: "instagram",
      name: "Instagram DM",
      description: "Connect to transform replies",
      icon: <Instagram color={colors.dark.primary} size={28} />,
      connected: false,
    },
    {
      id: "calendar",
      name: "Calendar",
      description: "Connect to automate Booking",
      icon: <Calendar color={colors.dark.primary} size={28} />,
      connected: false,
    },
    {
      id: "crm",
      name: "CRM (Zapier)",
      description: "Connect to automate clerics",
      icon: <Zap color={colors.dark.primary} size={28} />,
      connected: false,
    },
  ];

  const handleConnect = async (integrationId: string) => {
    console.log("Connecting to:", integrationId);
  };

  return (
   <Layout edges={["bottom"]}>
        <View style={styles.grid}>
          {integrations.map((integration) => (
            <View key={integration.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconWrapper}>{integration.icon}</View>
                <Text style={styles.cardTitle}>{integration.name}</Text>
              </View>
              <Text style={styles.cardDescription}>
                {integration.description}
              </Text>

              <Button
                size="sm"
                onPress={() => handleConnect(integration.id)}
                testID={`connect-${integration.id}`}
              >
                Connect
              </Button>
            </View>
          ))}
        </View>
   </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 14,
    justifyContent: "space-between" as const,
  },
  card: {
    width: "48%",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between" as const,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  cardHeader: {
    flexDirection: "column" as const,
    alignItems: "flex-start" as const,
    marginBottom: 8,
  },
  iconWrapper: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    marginBottom: 16,
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
