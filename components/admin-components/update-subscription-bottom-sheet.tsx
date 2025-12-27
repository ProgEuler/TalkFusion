import {
    SubscriptionPlan,
    useUpdateSubscriptionsMutation,
} from "@/api/admin-api/subscription.api";
import { Button } from "@/components/ui/Button";
import colors from "@/constants/colors";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
    BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";

interface UpdateSubscriptionBottomSheetProps {
  plan: SubscriptionPlan | null;
  onSuccess: () => void;
}

const UpdateSubscriptionBottomSheet = forwardRef<
  BottomSheetModal,
  UpdateSubscriptionBottomSheetProps
>(({ plan, onSuccess }, ref) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msgLimit, setMsgLimit] = useState("");
  const [userLimit, setUserLimit] = useState("");
  const [tokenLimit, setTokenLimit] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [updateSubscription, { isLoading }] = useUpdateSubscriptionsMutation();

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setPrice(plan.price.toString());
      setMsgLimit(plan.msg_limit.toString());
      setUserLimit(plan.user_limit.toString());
      setTokenLimit(plan.token_limit.toString());
      setFieldErrors({});
    }
  }, [plan]);

  const snapPoints = useMemo(() => ["60%", "80%"], []);

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

  const handleUpdate = async () => {
    if (!plan) return;

    try {
      setFieldErrors({});
      await updateSubscription({
        body: {
          name,
          price,
          msg_limit: parseInt(msgLimit),
          user_limit: parseInt(userLimit),
          token_limit: parseInt(tokenLimit),
        },
        id: plan.id,
      }).unwrap();

      toast.success("Plan updated successfully");
      onSuccess();
      (ref as React.MutableRefObject<BottomSheetModal>)?.current?.dismiss();
    } catch (error: any) {
      if (error.status === 400 && error.data) {
        setFieldErrors(error.data);
      }
      toast.error(error?.data?.message || "Failed to update plan");
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
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Update Subscription Plan</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Plan Name</Text>
          <BottomSheetTextInput
            style={[styles.input, fieldErrors.name && styles.inputError]}
            value={name}
            onChangeText={setName}
            placeholder="Plan Name"
            placeholderTextColor={colors.dark.textSecondary}
          />
          {fieldErrors.name && (
            <Text style={styles.errorText}>{fieldErrors.name[0]}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price ($)</Text>
          <BottomSheetTextInput
            style={[styles.input, fieldErrors.price && styles.inputError]}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor={colors.dark.textSecondary}
          />
          {fieldErrors.price && (
            <Text style={styles.errorText}>{fieldErrors.price[0]}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Message Limit</Text>
          <BottomSheetTextInput
            style={[styles.input, fieldErrors.msg_limit && styles.inputError]}
            value={msgLimit}
            onChangeText={setMsgLimit}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.dark.textSecondary}
          />
          {fieldErrors.msg_limit && (
            <Text style={styles.errorText}>{fieldErrors.msg_limit[0]}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>User Limit</Text>
          <BottomSheetTextInput
            style={[styles.input, fieldErrors.user_limit && styles.inputError]}
            value={userLimit}
            onChangeText={setUserLimit}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.dark.textSecondary}
          />
          {fieldErrors.user_limit && (
            <Text style={styles.errorText}>{fieldErrors.user_limit[0]}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Token Limit</Text>
          <BottomSheetTextInput
            style={[styles.input, fieldErrors.token_limit && styles.inputError]}
            value={tokenLimit}
            onChangeText={setTokenLimit}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.dark.textSecondary}
          />
          {fieldErrors.token_limit && (
            <Text style={styles.errorText}>{fieldErrors.token_limit[0]}</Text>
          )}
        </View>

        <Button
          style={styles.updateButton}
          onPress={handleUpdate}
          isLoading={isLoading}
        >
          Update Plan
        </Button>
      </BottomSheetScrollView>
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
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
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
    fontSize: 14,
  },
  inputError: {
    borderColor: colors.dark.danger,
  },
  errorText: {
    color: colors.dark.danger,
    fontSize: 12,
    marginTop: 4,
  },
  updateButton: {
    marginTop: 24,
  },
});

UpdateSubscriptionBottomSheet.displayName = "UpdateSubscriptionBottomSheet";

export default UpdateSubscriptionBottomSheet;
