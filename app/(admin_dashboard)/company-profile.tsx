import { useGetCompaniesQuery } from "@/api/admin-api/company.api";
import CompanyList from "@/components/admin-components/company-list";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";

export default function CompanyProfilePage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error, isFetching, refetch } = useGetCompaniesQuery({
    search: debouncedSearch || undefined,
    page,
  });
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorScreen onRetry={refetch} />;

  console.log(error);
  return (
    <Layout>
      <View style={styles.searchContainer}>
        <Search size={20} color="rgba(255, 255, 255, 0.5)" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or email..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={search}
          onChangeText={setSearch}
        />
        {isFetching && page === 1 && (
          <ActivityIndicator size="small" color={colors.dark.primary} />
        )}
      </View>
      {/* Company List */}
      <CompanyList companies={data.results} />
    </Layout>
  );
}

const styles = StyleSheet.create({
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
});
