import { useGetUsersQuery } from "@/api/admin-api/users.api";
import UsersList from "@/components/admin-components/users-list";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const statusFilters = [
  { label: "All Status", value: "all" },
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<boolean | string>("all");
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedStatus]);

  const { data, isLoading, isError, isFetching } = useGetUsersQuery({
    search: debouncedSearch || undefined,
    page,
    is_active: selectedStatus,
  });

  const handleLoadMore = () => {
    if (data?.next && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  const handleStatusFilter = (status: boolean | string) => {
    setSelectedStatus(status);
  };

  if (isLoading && page === 1) return <LoadingSpinner />;
  if (isError) return <ErrorScreen />;

  const hasMore = data?.next !== null;
  const users = data?.results || [];

  return (
    <Layout>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="rgba(255, 255, 255, 0.5)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or email..."
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {isFetching && page === 1 && (
            <ActivityIndicator size="small" color={colors.dark.primary} />
          )}
        </View>

        {/* Status Filter Chips */}
        <View
          style={styles.filterContainer}
        >
          {statusFilters.map((filter) => (
            <Pressable
              key={filter.label}
              style={[
                styles.filterChip,
                selectedStatus === filter.value && styles.filterChipActive,
              ]}
              onPress={() => handleStatusFilter(filter.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedStatus === filter.value && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Results Count */}
        {data && (
          <Text style={styles.resultsCount}>
            {data.count} {data.count === 1 ? 'user' : 'users'} found
          </Text>
        )}

        {/* User List */}
        {users.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No users found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          <UsersList
            users={users}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            isLoadingMore={isFetching && page > 1}
          />
        )}
      </View>
    </Layout>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  filterContainer: {
    marginBottom: 16,
    flexDirection: "row",
    gap: 6
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  filterChipActive: {
    backgroundColor: "#FFFFFF",
  },
  filterText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
  },
  filterTextActive: {
    color: colors.dark.background,
  },
  userList: {
    flex: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  userRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  resultsCount: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 12,
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  statusBadge: {
    fontSize: 14,
    fontWeight: "600",
  },
});
