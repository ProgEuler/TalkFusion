import {
   useApproveChannelMutation,
   useGetCompanyUserChannelListQuery,
   useRejectChannelMutation,
} from "@/api/admin-api/company.api";
import colors from "@/constants/colors";
import {
   BottomSheetBackdrop,
   BottomSheetFlatList,
   BottomSheetModal,
   BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, memo, useCallback, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";
import { Button } from "../ui/Button";

interface Channel {
  id: number;
  platform: string;
  profile_id: string;
  is_approved: boolean;
}

interface ChannelApproveRejectProps {
  company_id: number | undefined;
}

const ChannelItem = memo(
  ({
    channel,
    onApprove,
    onReject,
    isApprovving,
    isRejecting,
  }: {
    channel: Channel;
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
    isApprovving: boolean;
    isRejecting: boolean;
  }) => (
    <View style={styles.channelItem}>
      <View style={styles.channelInfo}>
        <Text style={styles.platformText}>{channel.platform.toUpperCase()}</Text>
        <Text style={styles.profileIdText}>ID: {channel.profile_id}</Text>
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
                color: channel.is_approved ? "#22c55e" : "#ef4444",
              },
            ]}
          >
            {channel.is_approved ? "Approved" : "Pending/Rejected"}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          size="sm"
          onPress={() => onApprove(channel.id)}
          isLoading={isApprovving}
          disabled={channel.is_approved}
          style={styles.actionButton}
        >
          {channel.is_approved ? "Approved" : "Approve"}
        </Button>
        {!channel.is_approved && (
          <Button
            size="sm"
            variant="destructive_outline"
            onPress={() => onReject(channel.id)}
            isLoading={isRejecting}
            style={styles.actionButton}
          >
            Reject
          </Button>
        )}
      </View>
    </View>
  )
);

const ChannelApproveReject = forwardRef<
  BottomSheetModal,
  ChannelApproveRejectProps
>(({ company_id }, ref) => {
  const { data, isLoading, isError, refetch } = useGetCompanyUserChannelListQuery(
    company_id!,
    {
      skip: !company_id,
    }
  );

  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const [approve, { isLoading: approving }] = useApproveChannelMutation();
  const [reject, { isLoading: rejecting }] = useRejectChannelMutation();

  const handleAction = useCallback(
    async (type: "approve" | "reject", id: number) => {
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
    },
    [approve, reject]
  );

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

  const renderItem = useCallback(
    ({ item: channel }: { item: Channel }) => (
      <ChannelItem
        channel={channel}
        onApprove={(id) => handleAction("approve", id)}
        onReject={(id) => handleAction("reject", id)}
        isApprovving={approving}
        isRejecting={rejecting}
      />
    ),
    [handleAction, approving, rejecting]
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Channel Status</Text>

        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator color={colors.dark.primary} />
            <Text style={styles.loadingText}>Loading channels...</Text>
          </View>
        ) : isError ? (
          <View style={styles.centerContainer}>
            <Text style={styles.noDataText}>No channels found</Text>
          </View>
        ) : (
          <BottomSheetFlatList
            data={data?.channels || []}
            keyExtractor={(item: any) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Text style={styles.noDataText}>No channels found</Text>
              </View>
            }
          />
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.dark.cardBackground,
  },
  handleIndicator: {
    backgroundColor: colors.dark.textSecondary,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 24,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
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
  listContent: {
    paddingBottom: 40,
  },
  channelItem: {
    backgroundColor: colors.dark.border,
    borderRadius: 12,
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
