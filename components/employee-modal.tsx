import { useUpdateEmployeeRolesMutation } from '@/api/user-api/team.api';
import colors from '@/constants/colors';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
   Image,
   Modal,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { Button } from './ui/Button';

const roles = [
  {
    value: 'owner',
    label: 'Owner',
    icon: () => <MaterialCommunityIcons name="crown" size={28} color="#fff" />,
  },
  {
    value: 'finance',
    label: 'Finance',
    icon: () => <MaterialIcons name="account-balance-wallet" size={28} color="#fff" />,
  },
  {
    value: 'support',
    label: 'Support',
    icon: () => <MaterialCommunityIcons name="headset" size={28} color="#fff" />,
  },
  {
    value: 'user',
    label: 'User',
    icon: () => <MaterialIcons name="person" size={28} color="#fff" />,
  },
];

const UpdateRoleModal = ({ visible = false, onClose, employee }) => {
  const [selectedRole, setSelectedRole] = useState('owner');
  const [updateEmployeeRoles, { isLoading } ] = useUpdateEmployeeRolesMutation();

//   console.log('Employee:', employee);

  const handleSave = async () => {
    if (!employee) return;
   //  console.log('Selected role:', selectedRole);

    const payload = {
      id: employee.id,
      body: {
         email: employee.email,
         roles: [selectedRole]
      }
    }

   //  console.log('Payload:', payload);
    try {
       const res = await updateEmployeeRoles(payload);
      //  console.log(res)
       Toast.success('Employee role updated successfully');
       onClose();
    } catch (error) {
      // console.log('Error updating employee roles:', error);
      Toast.error('Error updating employee role');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={{ color: "#fff"}}>Update Role</Text>
            <View style={{ width: 28 }} />
          </View>

          {/* User Info */}
            <View style={styles.userSection}>
            {employee?.profile_image ? (
              <Image
                source={{ uri: employee.profile_image }}
                style={styles.avatar}
              />
            ) : (
                <User size={40} color="#fff" style={styles.avatar} />
            )}
            <View style={styles.userInfo}>
              <Text style={{ color: "#fff" }}>{employee?.name || 'Unknown Helper'}</Text>
              <Text style={{ color: colors.dark.textSecondary}}>{employee?.email || 'No email'}</Text>
            </View>
          </View>

          {/* Select Role */}
          <Text style={styles.sectionTitle}>SELECT ROLE</Text>

          {/* Role Options */}
          <View style={styles.rolesContainer}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.value}
                style={[
                  styles.roleItem,
                  selectedRole === role.value && styles.roleItemSelected,
                ]}
                onPress={() => setSelectedRole(role.value)}
              >
                <View style={styles.roleLabel}>
                  {role.icon()}
                  <Text
                    style={styles.roleText}
                  >
                    {role.label}
                  </Text>
                </View>
                <View style={styles.radioOuter}>
                  {selectedRole === role.value && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <Button style={{ width: "48%"}} variant='outline' onPress={onClose}>Close</Button>
            <Button style={{ width: "48%"}} isLoading={isLoading} onPress={handleSave}>{isLoading ? 'Updating...' : 'Update'}</Button>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.dark.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  rolesContainer: {
    paddingHorizontal: 16,
  },
  roleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: colors.dark.border,
  },
  roleItemSelected: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  roleLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: 17,
    marginLeft: 12,
    color: '#fff',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 17,
    color: '#666',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 8,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '600',
  },
});

export default UpdateRoleModal;
