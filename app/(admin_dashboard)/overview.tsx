import type { Company, SocialChannel } from "@/api/admin-api/overview.api";
import { useGetOverviewQuery } from "@/api/admin-api/overview.api";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { timeAgo } from "@/utils/helpers";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { AlertTriangle, Check, Search } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const StatCard = ({
  title,
  value,
  type,
}: {
  title: string;
  value: number;
  type: "total" | "online" | "offline" | "warning";
}) => {
  const getIconColor = () => {
    switch (type) {
      case "total":
        return "#8B5CF6"; // Purple
      case "online":
        return "#10B981"; // Green
      case "offline":
        return "#EF4444"; // Red
      case "warning":
        return "#F59E0B"; // Orange
      default:
        return "#6B7280";
    }
  };

  return (
    <View style={styles.statCard}>
      <View style={[styles.iconCircle, { backgroundColor: getIconColor() }]}>
        {type === "online" ? (
          <Check size={20} color="white" />
        ) : type === "warning" || type === "offline" ? (
          <AlertTriangle size={20} color="white" />
        ) : (
          <Text style={styles.totalIcon}>{value}</Text>
        )}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
};

const ChannelItem = ({
  channel,
  name,
  iconName,
  iconColor,
}: {
  channel: SocialChannel | null;
  name: string;
  iconName: string;
  iconColor: string;
}) => {
  if (!channel) {
    return (
      <View style={styles.channelItem}>
        <View style={styles.channelHeader}>
          <FontAwesome5 name={iconName} size={16} color="#6B7280" />
          <Text style={[styles.channelName, { color: "#6B7280" }]}>{name}</Text>
        </View>
        <Text style={styles.notConnected}>Not Connected</Text>
      </View>
    );
  }

  return (
    <View style={styles.channelItem}>
      <View style={styles.channelHeader}>
        <FontAwesome5 name={iconName} size={16} color={iconColor} />
        <Text style={styles.channelName}>{name}</Text>
      </View>
      <View style={styles.channelStats}>
        <Text style={styles.statLabel}>Last Usage:</Text>
        <Text style={styles.statValue}>
          {channel.last_used ? timeAgo(channel.last_used) : "Never"}
        </Text>
      </View>
      <View style={styles.channelStats}>
        <Text style={styles.statLabel}>Messages Today:</Text>
        <Text style={styles.statValue}>{channel.messages_today}</Text>
      </View>
      <View style={styles.channelStats}>
        <Text style={styles.statLabel}>Status:</Text>
        <Text style={styles.statValue}>{channel.status}</Text>
      </View>
    </View>
  );
};

const CompanyCard = ({ company }: { company: Company }) => {
  const hasAnyChannel = company.whatsapp || company.facebook || company.instagram;
  const activeChannels = [
    company.whatsapp,
    company.facebook,
    company.instagram,
  ].filter(Boolean).length;

  return (
    <View style={styles.companyCard}>
      <View style={styles.companyHeader}>
        <View style={styles.companyTitleRow}>
          <View style={styles.diamondIcon} />
          <Text style={styles.companyName}>
            {company.name || `Company #${company.id}`}
          </Text>
        </View>
        {hasAnyChannel ? (
          <View style={styles.systemStatus}>
            <Text style={styles.systemStatusText}>
              {activeChannels} Channel{activeChannels !== 1 ? "s" : ""} Active
            </Text>
          </View>
        ) : (
          <View style={[styles.systemStatus, styles.systemStatusInactive]}>
            <Text style={[styles.systemStatusText, styles.systemStatusTextInactive]}>
              No Channels Connected
            </Text>
          </View>
        )}
      </View>

      {company.status_message && (
        <Text style={styles.statusMessage}>{company.status_message}</Text>
      )}

      <View style={styles.channelsList}>
        <ChannelItem
          channel={company.whatsapp}
          name="WhatsApp Business"
          iconName="whatsapp"
          iconColor="#10B981"
        />
        <ChannelItem
          channel={company.facebook}
          name="Facebook"
          iconName="facebook"
          iconColor="#1877F2"
        />
        <ChannelItem
          channel={company.instagram}
          name="Instagram"
          iconName="instagram"
          iconColor="#E1306C"
        />
      </View>
    </View>
  );
};

export default function OverviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError, refetch } = useGetOverviewQuery();

  console.log(data)

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorScreen onRetry={refetch} />;
  if (!data) return null;

  const filteredCompanies = data.companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalChannels = data.total_channels[0] || 0;
  const onlineChannels = data.online_channels[0] || 0;
  const offlineChannels = data.offline_channels[0] || 0;
  const warningChannels = data.warning_channels[0] || 0;

  return (
    <Layout>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.dark.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search company..."
          placeholderTextColor={colors.dark.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Channel Statistics */}
      <View style={styles.statsGrid}>
        <StatCard title="Total Channels" value={totalChannels} type="total" />
        <StatCard title="Online" value={onlineChannels} type="online" />
      </View>
      <View style={styles.statsGrid}>
        <StatCard title="Offline" value={offlineChannels} type="offline" />
        <StatCard title="Warning" value={warningChannels} type="warning" />
      </View>

      {/* Companies List */}
      <Text style={styles.sectionTitle}>
        Companies ({filteredCompanies.length})
      </Text>

      <FlashList
        data={filteredCompanies}
        renderItem={({ item }) => <CompanyCard company={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No companies found</Text>
          </View>
        }
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.cardBackground,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.dark.text,
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  totalIcon: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
    marginTop: 8,
    marginBottom: 12,
  },
  companyCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  companyHeader: {
    marginBottom: 12,
  },
  companyTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  diamondIcon: {
    width: 8,
    height: 8,
    transform: [{ rotate: "45deg" }],
    backgroundColor: colors.dark.primary,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
  },
  systemStatus: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  systemStatusInactive: {
    backgroundColor: "rgba(107, 114, 128, 0.15)",
  },
  systemStatusText: {
    fontSize: 11,
    color: "#10B981",
    fontWeight: "600",
  },
  systemStatusTextInactive: {
    color: "#6B7280",
  },
  statusMessage: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    marginBottom: 12,
    fontStyle: "italic",
  },
  channelsList: {
    gap: 12,
  },
  channelItem: {
    gap: 6,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  channelHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  channelName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark.text,
  },
  notConnected: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
  },
  channelStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
});
