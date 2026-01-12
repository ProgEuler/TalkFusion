import { useGetChatProfileListQuery, useSubscribeFacebookPageMutation } from "@/api/user-api/chat.api";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import { Check, Facebook } from "lucide-react-native";
import { RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";

interface ChatProfile {
  id: number;
  bot_active: boolean;
  profile_id: string;
  name: string;
  platform: string;
}

export default function FacebookPagesScreen() {

  const { data: profiles, isLoading, error, refetch, isFetching } = useGetChatProfileListQuery("facebook");

  // We use lazy query for subscription because it's triggered on click
  const [subscribe, { isLoading: isSubscribing, isSuccess, isError }] = useSubscribeFacebookPageMutation();

  const handleSubscribe = async (profileId: number, pageName: string) => {
    try {
        // The API returns void/success or error, we just need to hit it
      await subscribe(profileId).unwrap();
      refetch();
      toast.success(`Subscribed to ${pageName}`);
    } catch (err) {
      toast.error(`Failed to subscribe to ${pageName}`);
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <Layout>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Failed to load Facebook pages.</Text>
        </View>
      </Layout>
    );
  }

  const renderItem = ({ item }: { item: ChatProfile }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSubscribe(item.id, item.name)}
      disabled={isSubscribing}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
            <Facebook color="white" size={24} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.profileId}>ID: {item.profile_id}</Text>
        </View>
        {item.bot_active && (
            <View style={styles.activeBadge}>
                <Check size={12} color={colors.dark.primary} />
                <Text style={styles.activeText}>Active</Text>
            </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }>
      <View style={styles.header}>
        <Text style={styles.title}>Facebook Pages</Text>
        <Text style={styles.subtitle}>Select a page to subscribe</Text>
      </View>

      <FlashList
        data={profiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
            <View style={styles.centerContainer}>
                <Text style={styles.emptyText}>No Facebook pages found.</Text>
            </View>
        }
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.dark.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
   marginTop: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1877F2", // Facebook blue
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
  },
  profileId: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(34, 197, 94, 0.1)", // Green tint
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    fontSize: 12,
    color: "#22C55E", // Green
    fontWeight: "500",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 16,
  },
  emptyText: {
    color: colors.dark.textSecondary,
    fontSize: 16,
  },
});
