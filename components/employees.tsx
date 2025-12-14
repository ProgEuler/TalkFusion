import { useGetEmployeesQuery } from "@/api/user-api/team.api";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import { ChevronRight, User } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ErrorScreen from "./Error";

export type Employee = {
  id: number;
  email: string;
  roles: string[];
  name?: string;
  profile_image?: string;
};

function Employees({ onEmployeePress }: { onEmployeePress?: (employee: Employee) => void }) {
  const { data, isLoading, isError, refetch } = useGetEmployeesQuery(undefined);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator size="small" color={colors.dark.primary} />
      </View>
    );
  }

  if (isError) return <ErrorScreen onRetry={refetch} component />;

  const employees: Employee[] = data?.employees || [];

  function onPress(employee: Employee){
    console.log("CLicked Employee", employee.id)
    if (onEmployeePress) {
      onEmployeePress(employee);
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={{ color: "#FFFFFF"}}>Set Role-based admin</Text>
      </View>

      <View style={styles.list}>
        {employees.length === 0 ? (
           <Text style={{ color: "#FFFFFF"}}>No employees found</Text>
        ) : (
          <FlashList
            data={employees}
            renderItem={({ item }: { item: Employee }) => (
              <TouchableOpacity onPress={() => onPress(item)}>
                <View style={styles.item}>
                  {item?.profile_image ? (
                    <Image source={{ uri: item.profile_image }} style={styles.avatar} />
                  ) : (
                    <User color={"#ffffff"} />
                  )}
                  <View style={styles.info}>
                    <Text style={{ color: "#FFFFFF"}}>{item?.name || item?.email}</Text>
                    <Text style={{ color: "#FFFFFF"}}>{item?.roles?.join(", ")}</Text>
                  </View>
                  <ChevronRight size={20} color="#8E8E93" />
                </View>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827", // Dark text
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB", // Blue link color
  },
  list: {
    gap: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6B7280", // Gray text
  },
  emptyText: {
      textAlign: 'center',
      color: '#6B7280',
      padding: 20
  }
});

export default Employees;
