import Layout from "@/components/layout/Layout";
import colors from "@/constants/colors";
import { Check, ChevronDown, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TeamPermissionsPage = () => {
  const [inviteEmail, setInviteEmail] = useState("");

  const permissions = [
    {
      name: "View Dashboard",
      owner: true,
      finance: true,
      support: true,
      analyst: true,
      readonly: true,
    },
    {
      name: "Manage Users",
      owner: true,
      finance: false,
      support: false,
      analyst: true,
      readonly: false,
    },
    {
      name: "Financial Data",
      owner: true,
      finance: true,
      support: false,
      analyst: true,
      readonly: true,
    },
    {
      name: "Customer Support",
      owner: false,
      finance: false,
      support: true,
      analyst: false,
      readonly: true,
    },
    {
      name: "Billing & Invoices",
      owner: true,
      finance: true,
      support: true,
      analyst: false,
      readonly: true,
    },
    {
      name: "Analytics & Reports",
      owner: false,
      finance: false,
      support: false,
      analyst: true,
      readonly: false,
    },
    {
      name: "System Settings",
      owner: true,
      finance: true,
      support: false,
      analyst: true,
      readonly: true,
    },
    {
      name: "API Management",
      owner: true,
      finance: false,
      support: true,
      analyst: false,
      readonly: false,
    },
  ];

  const admins = [
    {
      name: "Jane Cooper",
      email: "felicia.reid@example.com",
      company: "Louis Vuitton",
      role: "Owner",
    },
    {
      name: "Wade Warren",
      email: "sara.cruz@example.com",
      company: "The Walt Disney Company",
      role: "Support",
    },
    {
      name: "Jenny Wilson",
      email: "nathan.roberts@example.com",
      company: "Bank of America",
      role: "Owner",
    },
    {
      name: "Guy Hawkins",
      email: "jackson.graham@example.com",
      company: "The Walt Disney Company",
      role: "Finance",
    },
  ];

  const roleColors: Record<string, any> = {
    Owner: styles.roleOwner,
    Support: styles.roleSupport,
    Finance: styles.roleFinance,
  };

  return (
    <Layout scrollable>
      <View style={styles.container}>
        {/* Team & Permissions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team & Permissions</Text>
          <Text style={styles.sectionSubtitle}>
            Invite teammates and assign roles
          </Text>

          {/* Invite Input */}
          <View style={styles.inviteBox}>
            <TextInput
              style={styles.emailInput}
              placeholder="Email address here"
              placeholderTextColor="#999"
              value={inviteEmail}
              onChangeText={setInviteEmail}
            />
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteButtonText}>Invite</Text>
            </TouchableOpacity>
          </View>

          {/* RBAC Table */}
          <View style={styles.rbacContainer}>
            <Text style={styles.rbacTitle}>
              Role-Based Access Control (RBAC)
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                {/* Header Row */}
                <View style={styles.tableHeaderRow}>
                  <View style={styles.colPermissionHeader}>
                    <Text style={styles.tableHeaderText}>Permission</Text>
                  </View>
                  {["Owner", "Finance", "Support", "Analyst", "Read-only"].map(
                    (role) => (
                      <View key={role} style={styles.colHeader}>
                        <Text style={styles.tableHeaderText}>{role}</Text>
                      </View>
                    )
                  )}
                </View>

                {/* Permission Rows */}
                {permissions.map((perm, idx) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={styles.colPermission}>
                      <Text style={styles.permissionName}>{perm.name}</Text>
                    </View>
                    {["owner", "finance", "support", "analyst", "readonly"].map(
                      (key) => (
                        <View key={key} style={styles.colCheck}>
                          {(perm as any)[key] ? (
                            <Check color="#10B981" size={18} />
                          ) : (
                            <X color="#EF4444" size={18} />
                          )}
                        </View>
                      )
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Admin Table */}
          <View style={styles.adminContainer}>
            <Text style={styles.adminTitle}>Set Role-based admin</Text>

            {admins.map((admin, idx) => (
              <View key={idx} style={styles.adminCard}>
                <View style={styles.adminRow}>
                  <View style={styles.adminCol}>
                    <Text style={styles.adminLabel}>Name</Text>
                    <Text style={styles.adminValue}>{admin.name}</Text>
                  </View>
                  <View style={styles.adminCol}>
                    <Text style={styles.adminLabel}>Role</Text>
                    <View style={[styles.roleBadge, roleColors[admin.role]]}>
                      <Text style={styles.roleBadgeText}>{admin.role}</Text>
                      <ChevronDown
                        color="#FFFFFF"
                        size={14}
                        style={styles.chevron}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.adminRow}>
                  <View style={[styles.adminCol, styles.adminColHalf]}>
                    <Text style={styles.adminLabel}>Email</Text>
                    <Text style={styles.adminSubValue}>{admin.email}</Text>
                  </View>
                  <View style={[styles.adminCol, styles.adminColHalf]}>
                    <Text style={styles.adminLabel}>Company</Text>
                    <Text style={styles.adminSubValue}>{admin.company}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.updateButton}>
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default TeamPermissionsPage;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 8 },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionSubtitle: { color: "#9CA3AF", fontSize: 14, marginBottom: 16 },

  inviteBox: { marginBottom: 16 },
  emailInput: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    color: "#000000",
    fontSize: 16,
  },
  inviteButton: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  inviteButtonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 16 },

  // RBAC Table
  rbacContainer: { marginVertical: 24 },
  rbacTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  tableHeaderRow: { flexDirection: "row", marginBottom: 8 },
  colPermissionHeader: { width: 160, paddingRight: 8 },
  colHeader: { width: 64, alignItems: "center" },
  tableHeaderText: { color: "#9CA3AF", fontSize: 12, fontWeight: "600" },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
  },
  colPermission: { width: 160, paddingRight: 8, justifyContent: "center" },
  permissionName: { color: "#FFFFFF", fontSize: 14 },
  colCheck: { width: 64, alignItems: "center", justifyContent: "center" },

  // Admin Table
  adminTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  adminCard: {
    backgroundColor: "#111111",
    borderRadius: 8,
    marginBottom: 12,
  },
  adminRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  adminCol: { flex: 1 },
  adminColHalf: { flex: 1, marginRight: 8 },
  adminLabel: {
    color: "#3B82F6",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  adminValue: { color: "#FFFFFF", fontWeight: "600", fontSize: 15 },
  adminSubValue: { color: "#D1D5DB", fontSize: 14 },

  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    borderWidth: 1,
    borderColor: "#4B5563",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  roleBadgeText: { color: "#FFFFFF", fontSize: 14, marginRight: 4 },
  chevron: {},

  roleOwner: { backgroundColor: "#374151" },
  roleSupport: { backgroundColor: "#374151" },
  roleFinance: { backgroundColor: "#374151" },

  updateButton: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  updateButtonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 14 },
});
