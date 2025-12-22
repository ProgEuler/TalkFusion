import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type User = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  company_name: string;
  is_active: boolean;
};

interface UsersListProps {
  users: User[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export default function UsersList({
  users,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}: UsersListProps) {
  const getStatusColor = (isActive: boolean) => {
    return isActive ? "#10B981" : "#6B7280";
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? "Active" : "Inactive";
  };

  const getUserInitials = (name: string | null, email: string) => {
    if (name) {
      const nameParts = name.split(" ");
      if (nameParts.length >= 2) {
        return nameParts[0][0] + nameParts[1][0];
      }
      return name.substring(0, 2);
    }
    return email.substring(0, 2);
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={colors.dark.primary} />
        <Text style={styles.loadingText}>Loading more users...</Text>
      </View>
    );
  };

  return (
    <FlashList
      data={users}
      renderItem={({ item: user }) => (
        <Pressable style={styles.userItem}>
          <View
            style={[styles.avatar, { backgroundColor: colors.dark.primary }]}
          >
            {/* {user.image} */}
            <Text style={styles.avatarText}>
              {getUserInitials(user.name, user.email).toUpperCase()}
            </Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name || "N/A"}</Text>
            <Text
              style={[
                styles.statusBadge,
                { color: getStatusColor(user.is_active) },
              ]}
            >
              {getStatusText(user.is_active)}
            </Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            {user.company_name && (
              <Text style={styles.userCompany}>{user.company_name}</Text>
            )}
          </View>

          <View style={styles.userRight}>
            <ChevronRight size={20} color="rgba(255, 255, 255, 0.3)" />
          </View>
        </Pressable>
      )}
      onEndReached={hasMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  userList: {
    flex: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  userEmail: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 2,
  },
  userCompany: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
  },
  userRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    fontSize: 12,
  },
  loadingFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
