import { useChangeNameMutation } from "@/api/auth.api";
import { Button } from "@/components/ui/Button";
import { RNInput } from "@/components/ui/input";
import { RNText } from "@/components/ui/text";
import colors from "@/constants/colors";
import { X } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function EditProfile({ visible, onClose }: Props) {
   const [name, setName] = useState("")
   const [close, setClose] = useState(false);
   const [change, {isLoading, isError, error: err} ] = useChangeNameMutation()

   const handleChange = async () => {
      try {
         await change({ name });
         toast.success("Name changed successfully");
         setClose(true)
      } catch (error) {
         console.log(err)
         toast.error("Failed to change name")
         setClose(true)
      }
   }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose || close}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Profile</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X color={colors.dark.textSecondary} size={24} />
            </Pressable>
          </View>

          <View style={styles.options}>
            <RNText>Full Name</RNText>
            <RNInput placeholder="Full Name" onChangeText={(e) => setName(e)} />
          <Button onPress={handleChange} isLoading={isLoading}>Update</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 300,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
  },
  closeButton: {
    padding: 4,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.dark.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  removeOption: {
    borderColor: colors.dark.danger + "30",
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  removeIcon: {
    backgroundColor: colors.dark.danger + "20",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.dark.text,
  },
  removeText: {
    color: colors.dark.danger,
  },
});
