import { useAddEmployeeMutation } from '@/api/user-api/team.api'
import colors from '@/constants/colors'
import {
   BottomSheetBackdrop,
   BottomSheetModal,
   BottomSheetView,
} from "@gorhom/bottom-sheet"
import { ChevronDown, Users } from 'lucide-react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { toast } from 'sonner-native'
import { Button } from '../ui/Button'
import { isValidEmail } from '@/utils/validation'

const AVAILABLE_ROLES = ["owner", "finance", "support", "analyst", "read_only"];

const AddEmployee = () => {
   const [email, setEmail] = useState("");
   const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
   const snapPoints = useMemo(() => ["50%"], []);

   const [addEmployee, {isLoading}] = useAddEmployeeMutation()

   const handlePresentModal = useCallback(() => {
     bottomSheetModalRef.current?.present();
   }, []);

   const handleDismissModal = useCallback(() => {
     bottomSheetModalRef.current?.dismiss();
   }, []);

   const toggleRole = (role: string) => {
     setSelectedRoles((prev) =>
       prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
     );
   };

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

   const handleInvite = async () => {
      if (!email.trim() || !email.includes('@')) {
         toast.error("Please enter a valid email");
         return;
      }
      if (selectedRoles.length === 0) {
         toast.error("Please select at least one role");
         return;
      }

      try {
         await addEmployee({
            email: email.trim(),
            roles: selectedRoles
         }).unwrap();
         toast.success("Employee invited successfully!");
         setEmail("");
         setSelectedRoles([]);
      } catch (error: any) {
         const message = error?.data?.error || "Failed to invite employee";
         toast.error(message);
      }
   }

   return (
    <View style={styles.container}>
      <Text style={styles.label}>Invite your employee</Text>

      <TextInput
        style={{
         padding: 16,
         borderColor: colors.dark.border,
         borderWidth: 1,
         borderRadius: 8,
         color: "#fff"
        }}
        placeholder='Email address'
        placeholderTextColor={colors.dark.text}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.roleSelector}
        onPress={handlePresentModal}
        activeOpacity={0.7}
      >
        <View style={styles.roleSelectorLeft}>
          <Users size={20} color={colors.dark.textSecondary} />
          <Text style={[
            styles.roleSelectorText,
            selectedRoles.length > 0 && { color: colors.dark.text }
          ]}>
            {selectedRoles.length > 0
              ? `${selectedRoles.length} role${selectedRoles.length > 1 ? 's' : ''} selected`
              : 'Select roles'
            }
          </Text>
        </View>
        <ChevronDown size={20} color={colors.dark.textSecondary} />
      </TouchableOpacity>

      <Button
        onPress={handleInvite}
        isLoading={isLoading}
        disabled={!email.trim() || selectedRoles.length === 0
         || !isValidEmail(email)}
      >
        Send Invite
      </Button>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Roles</Text>
          <Text style={styles.modalSubtitle}>Assign one or more roles to this employee</Text>

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

          <Button
            onPress={handleDismissModal}
            style={{ marginTop: 20 }}
          >
            Done
          </Button>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 20
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.dark.text,
    marginBottom: 8,
  },
  roleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark.border,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  roleSelectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleSelectorText: {
    color: colors.dark.textSecondary,
    fontSize: 16,
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
  rolesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  roleChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
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
    fontSize: 15,
    fontWeight: "500",
  },
  selectedRoleChipText: {
    color: colors.dark.primary,
    fontWeight: "700",
  },
});

export default AddEmployee
