import {
    useAddTeamMemberMutation,
    useGetTeamMemberQuery,
} from "@/api/admin-api/team-member.api";
import MemberCard from "@/components/admin-components/member-card";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetTextInput,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";

const SNAP_POINTS = ["65%"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AVAILABLE_ROLES = ["owner", "finance", "admin", "agent"];

export default function TeamPage() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => SNAP_POINTS, []);

  const [memberEmail, setMemberEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const { data, isLoading, isError, refetch } = useGetTeamMemberQuery(undefined);
  const [addTeam, { isLoading: addingTeam }] = useAddTeamMemberMutation();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setMemberEmail("");
    setSelectedRoles([]);
  }, []);

  const toggleRole = useCallback((role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  const validateInvite = useCallback((email: string, roles: string[]): boolean => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return false;
    }

    if (!EMAIL_REGEX.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (roles.length === 0) {
      toast.error("Please select at least one role");
      return false;
    }

    return true;
  }, []);

  const handleInvite = useCallback(async () => {
    if (!validateInvite(memberEmail, selectedRoles)) return;

    try {
      await addTeam({
        email: memberEmail.trim(),
        roles: selectedRoles
      }).unwrap();
      toast.success("Team member invited successfully");
      handleDismissModal();
      refetch();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to invite team member";
      toast.error(errorMessage);
    }
  }, [memberEmail, selectedRoles, addTeam, validateInvite, handleDismissModal, refetch]);

  const renderMemberCard = useCallback(
    ({ item }: { item: any }) => <MemberCard item={item} />,
    []
  );

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <ErrorScreen onRetry={refetch} />
      </Layout>
    );
  }

  if (!data?.results) {
    return null;
  }

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.title}>Team Members</Text>
        <Button size="sm" onPress={handlePresentModalPress}>
          Invite Member
        </Button>
      </View>

      <FlashList
        data={data.results}
        renderItem={renderMemberCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior="fillParent"
        enableDynamicSizing={false}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Invite Team Member</Text>
          <Text style={styles.modalSubtitle}>
            Send an invitation to add a new member to your team
          </Text>

          <BottomSheetTextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={colors.dark.textSecondary}
            value={memberEmail}
            onChangeText={setMemberEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
          />

          <View style={styles.rolesSection}>
            <Text style={styles.rolesLabel}>Select Roles</Text>
            <View style={styles.rolesGrid}>
              {AVAILABLE_ROLES.map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleChip,
                    selectedRoles.includes(role) && styles.selectedRoleChip,
                  ]}
                  onPress={() => toggleRole(role)}
                >
                  <Text
                    style={[
                      styles.roleChipText,
                      selectedRoles.includes(role) && styles.selectedRoleChipText,
                    ]}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              variant="outline"
              onPress={handleDismissModal}
              style={styles.cancelButton}
              disabled={addingTeam}
            >
              Cancel
            </Button>
            <Button
              onPress={handleInvite}
              isLoading={addingTeam}
              style={styles.inviteButton}
              disabled={!memberEmail.trim() || selectedRoles.length === 0}
            >
              Send Invite
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: colors.dark.text,
    fontSize: 24,
    fontWeight: "700",
  },
  listContent: {
    paddingBottom: 20,
  },
  bottomSheetBackground: {
    backgroundColor: colors.dark.cardBackground,
  },
  handleIndicator: {
    backgroundColor: colors.dark.textSecondary,
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 24,
  },
  input: {
    color: colors.dark.text,
    borderRadius: 12,
    fontSize: 16,
    lineHeight: 20,
    padding: 16,
    backgroundColor: colors.dark.border,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  rolesSection: {
    marginTop: 24,
  },
  rolesLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 12,
  },
  rolesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  roleChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.dark.border,
    backgroundColor: colors.dark.background,
  },
  selectedRoleChip: {
    borderColor: colors.dark.primary,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
  },
  roleChipText: {
    color: colors.dark.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  selectedRoleChipText: {
    color: colors.dark.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  cancelButton: {
    flex: 1,
  },
  inviteButton: {
    flex: 1,
  },
});
