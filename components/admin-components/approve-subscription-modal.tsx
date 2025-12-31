import { useApproveSubscriptionRequestMutation } from "@/api/admin-api/subscription.api";
import { Button } from "@/components/ui/Button";
import colors from "@/constants/colors";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetTextInput,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";

interface ApproveSubscriptionModalProps {
  requestId: number | null;
  onSuccess: () => void;
}

const ApproveSubscriptionModal = forwardRef<
  BottomSheetModal,
  ApproveSubscriptionModalProps
>(({ requestId, onSuccess }, ref) => {
  const [price, setPrice] = useState("");
  const [approveRequest, { isLoading }] = useApproveSubscriptionRequestMutation();

  useEffect(() => {
    setPrice("");
  }, [requestId]);

  const snapPoints = useMemo(() => ["40%"], []);

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

  const handleApprove = async () => {
    if (!requestId) return;
    if (!price || isNaN(parseFloat(price))) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      await approveRequest({
        id: requestId,
        price: parseFloat(price),
      }).unwrap();

      toast.success("Subscription request approved successfully");
      onSuccess();
      (ref as React.MutableRefObject<BottomSheetModal>)?.current?.dismiss();
      setPrice("");
    } catch (error: any) {
      toast.error(error?.data?.detail || "Failed to approve request");
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Approve Subscription</Text>
        <Text style={styles.subtitle}>Set the monthly price for this custom plan.</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price ($)</Text>
          <BottomSheetTextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor={colors.dark.textSecondary}
            autoFocus
          />
        </View>

        <Button
          style={styles.approveButton}
          onPress={handleApprove}
          isLoading={isLoading}
        >
          Approve & Set Price
        </Button>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.dark.cardBackground,
  },
  handleIndicator: {
    backgroundColor: colors.dark.primary,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.dark.background,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: 8,
    padding: 12,
    color: "white",
    fontSize: 16,
  },
  approveButton: {
    marginTop: 8,
  },
});

ApproveSubscriptionModal.displayName = "ApproveSubscriptionModal";

export default ApproveSubscriptionModal;
