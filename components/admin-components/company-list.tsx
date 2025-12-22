import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import { Building2, ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface Company {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  billingContact: string;
  email: string;
  dueAmount: number;
  totalPaid: number;
  icon?: string;
}

interface CompanyListProps {
  companies: Company[];
}

export default function CompanyList({ companies }: CompanyListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderCompanyCard = ({ item: company }: { item: Company }) => {
    const isExpanded = expandedId === company.id;

    return (
      <View style={styles.card}>
        {/* Company Header */}
        <View style={styles.cardHeader}>
          <View style={styles.companyInfo}>
            <View style={styles.iconContainer}>
              <Building2 size={20} color={colors.dark.primary} />
            </View>
            <Text style={styles.companyName}>{company.name}</Text>
          </View>
          {/* <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusBgColor(company.status) },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(company.status) },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(company.status) },
              ]}
            >
              {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
            </Text>
          </View> */}
        </View>

        {/* Expandable Details */}
        {isExpanded && (
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Billing Contact</Text>
              <Text style={styles.detailValue}>{company.billing_contact}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={[styles.detailValue, styles.emailText]}>
                {company.email}
              </Text>
            </View>

            <View style={styles.amountRow}>
              <View style={styles.amountItem}>
                {/* <Text style={styles.amountLabel}>Due Amount</Text>
                <Text style={styles.dueAmount}>
                  {formatCurrency(company.dueAmount)}
                </Text> */}
              </View>
              <View style={styles.amountItem}>
                <Text style={styles.amountLabel}>Total Paid</Text>
                <Text style={styles.totalPaid}>
                  {company.total_paid || "N/A"}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* View More Button */}
        <Pressable
          style={styles.viewMoreButton}
          onPress={() => toggleExpand(company.id)}
        >
          <Text style={styles.viewMoreText}>
            {isExpanded ? "View Less Details" : "View More Details"}
          </Text>
          {isExpanded ? (
            <ChevronUp size={16} color="rgba(255, 255, 255, 0.5)" />
          ) : (
            <ChevronDown size={16} color="rgba(255, 255, 255, 0.5)" />
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Company List */}
      <FlashList
        data={companies}
        renderItem={renderCompanyCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  searchInput: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
    paddingTop: 16,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.5)",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  emailText: {
    color: colors.dark.primary,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  amountItem: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 4,
  },
  dueAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  totalPaid: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "right",
  },
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  viewMoreText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "500",
  },
});
