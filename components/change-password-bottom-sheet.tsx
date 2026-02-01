import { useChnagePassMutation } from "@/api/auth.api";
import { Button } from "@/components/ui/Button";
import colors from "@/constants/colors";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetTextInput,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";

const SNAP_POINTS = ["60%"];

interface ChangePasswordBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
}

export default function ChangePasswordBottomSheet({
  bottomSheetRef,
}: ChangePasswordBottomSheetProps) {
  const snapPoints = useMemo(() => SNAP_POINTS, []);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, { isLoading }] = useChnagePassMutation();

  const handleDismissModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  }, [bottomSheetRef]);

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

  const validatePasswords = useCallback((): boolean => {
    if (!currentPassword.trim()) {
      toast.error("Please enter your current password");
      return false;
    }

    if (!newPassword.trim()) {
      toast.error("Please enter a new password");
      return false;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return false;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from current password");
      return false;
    }

    return true;
  }, [currentPassword, newPassword, confirmPassword]);

  const handleChangePassword = useCallback(async () => {
    if (!validatePasswords()) return;

    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      }).unwrap();
      toast.success("Password changed successfully");
      handleDismissModal();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to change password";
      toast.error(errorMessage);
    }
  }, [currentPassword, newPassword, changePassword, validatePasswords, handleDismissModal]);

  const isFormValid = currentPassword.trim() && newPassword.trim() && confirmPassword.trim();

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      keyboardBehavior="fillParent"
      enableDynamicSizing={false}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.modalContent}>
        <Text style={styles.modalTitle}>Change Password</Text>
        <Text style={styles.modalSubtitle}>
          Enter your current password and choose a new one
        </Text>

        {/* Current Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <View style={styles.passwordContainer}>
            <BottomSheetTextInput
              style={styles.passwordInput}
              placeholder="Enter current password"
              placeholderTextColor={colors.dark.textSecondary}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff size={20} color={colors.dark.textSecondary} />
              ) : (
                <Eye size={20} color={colors.dark.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.passwordContainer}>
            <BottomSheetTextInput
              style={styles.passwordInput}
              placeholder="Enter new password"
              placeholderTextColor={colors.dark.textSecondary}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff size={20} color={colors.dark.textSecondary} />
              ) : (
                <Eye size={20} color={colors.dark.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm New Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <View style={styles.passwordContainer}>
            <BottomSheetTextInput
              style={styles.passwordInput}
              placeholder="Confirm new password"
              placeholderTextColor={colors.dark.textSecondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={20} color={colors.dark.textSecondary} />
              ) : (
                <Eye size={20} color={colors.dark.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            variant="outline"
            onPress={handleDismissModal}
            style={styles.cancelButton}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onPress={handleChangePassword}
            isLoading={isLoading}
            style={styles.changeButton}
            disabled={!isFormValid}
          >
            Change Password
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.border,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  passwordInput: {
    flex: 1,
    color: colors.dark.text,
    fontSize: 16,
    lineHeight: 20,
    padding: 16,
  },
  eyeIcon: {
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  cancelButton: {
    flex: 1,
  },
  changeButton: {
    flex: 1,
  },
});