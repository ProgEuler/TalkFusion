import {
   useApproveChannelMutation,
   useGetCompanyUserChannelListQuery,
   useRejectChannelMutation,
} from "@/api/admin-api/company.api";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import {
   ActivityIndicator,
   KeyboardAvoidingView,
   Modal,
   Platform,
   Pressable,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { toast } from "sonner-native";
import { Button } from "../ui/Button";

interface ChannelApproveRejectProps {
  visible: boolean;
  onClose: () => void;
  company_id: number;
}

const ChannelApproveReject = ({
  visible,
  onClose,
  company_id,
}: ChannelApproveRejectProps) => {
  const { data, isLoading, isError, refetch } =
    useGetCompanyUserChannelListQuery(company_id, {
      skip: !company_id,
    });

  const [approve, { isLoading: approving }] = useApproveChannelMutation();
  const [reject, { isLoading: rejecting }] = useRejectChannelMutation();

  const handleAction = async (type: "approve" | "reject", id: number) => {
    try {
      if (type === "approve") {
        await approve({ chat_profile_id: id }).unwrap();
        toast.success("Channel Approved");
      } else {
        await reject({ chat_profile_id: id }).unwrap();
        toast.success("Channel Rejected");
      }
    } catch (error: any) {
      toast.error(error?.data?.detail || `Failed to ${type} channel`);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.modalContent}>
            {/* Handle Bar */}
            <View style={styles.handleBar} />

            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Channel Status</Text>
              <View style={{ width: 60 }} />
            </View>

            <View style={styles.contentContainer}>
              {isLoading ? (
                <View style={styles.centerContainer}>
                  <ActivityIndicator color={colors.dark.primary} />
                  <Text style={styles.loadingText}>Loading channels...</Text>
                </View>
              ) : isError ? (
                <View style={styles.centerContainer}>
                  <Text
                    style={[styles.noDataText, { color: colors.dark.danger }]}
                  >
                    Failed to load channels
                  </Text>
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => refetch()}
                    style={{ marginTop: 12 }}
                  >
                    Retry
                  </Button>
                </View>
              ) : (
                <View style={{ height: 400, width: "100%" }}>
                  <FlashList
                    data={data?.channels || []}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item: channel }: { item: any }) => (
                      <View style={styles.channelItem}>
                        <View style={styles.channelInfo}>
                          <Text style={styles.platformText}>
                            {channel.platform.toUpperCase()}
                          </Text>
                          <Text style={styles.profileIdText}>
                            ID: {channel.profile_id}
                          </Text>
                          <View
                            style={[
                              styles.statusBadge,
                              {
                                backgroundColor: channel.is_approved
                                  ? "rgba(34, 197, 94, 0.2)"
                                  : "rgba(239, 68, 68, 0.2)",
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.statusText,
                                {
                                  color: channel.is_approved
                                    ? "#22c55e"
                                    : "#ef4444",
                                },
                              ]}
                            >
                              {channel.is_approved
                                ? "Approved"
                                : "Pending/Rejected"}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.actions}>
                          <Button
                            size="sm"
                            onPress={() => handleAction("approve", channel.id)}
                            isLoading={approving}
                            disabled={channel.is_approved}
                            style={styles.actionButton}
                          >
                            {channel.is_approved ? "Approved" : "Approve"}
                          </Button>
                          {!channel.is_approved && (
                            <Button
                              size="sm"
                              variant="destructive_outline"
                              onPress={() => handleAction("reject", channel.id)}
                              isLoading={rejecting}
                              style={styles.actionButton}
                            >
                              Reject
                            </Button>
                          )}
                        </View>
                      </View>
                    )}
                    ListEmptyComponent={
                      <View style={styles.centerContainer}>
                        <Text style={styles.noDataText}>No channels found</Text>
                      </View>
                    }
                  />
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  keyboardView: {
    width: "100%",
  },
  modalContent: {
    backgroundColor: colors.dark.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "40%",
    paddingBottom: 40,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  cancelText: {
    fontSize: 16,
    color: colors.dark.primary,
    fontWeight: "400",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  contentContainer: {
    padding: 20,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    color: colors.dark.textSecondary,
    fontSize: 14,
  },
  noDataText: {
    color: colors.dark.textSecondary,
    fontSize: 16,
  },
  channelItem: {
    backgroundColor: colors.dark.cardBackground,
   //  borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  channelInfo: {
    flex: 1,
    gap: 4,
  },
  platformText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.dark.text,
  },
  profileIdText: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    minWidth: 80,
  },
});

export default ChannelApproveReject;
