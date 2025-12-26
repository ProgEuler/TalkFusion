import { useGetMeQuery } from "@/api/admin-api/users.api";
import { Layout } from "@/components/layout/Layout";
import Sessions from "@/components/sesstions";
import { Button } from "@/components/ui/Button";
import { ModalView } from "@/components/ui/modal-view";
import colors from "@/constants/colors";
import { Trash2, TriangleAlert } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Modal, StyleSheet, Switch, Text, View } from "react-native";

export default function Settings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [deleteAcc, setDeleteAcc] = useState(false);

  const {data: user, isLoading} = useGetMeQuery(undefined)

  return (
    <Layout>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteAcc}
        onRequestClose={() => {
          setDeleteAcc(!deleteAcc);
        }}
      >
        <ModalView
          visible={deleteAcc}
          onClose={() => setDeleteAcc(false)}
          title={"Delete Account?"}
          buttonLabel="Close"
          buttonVariant={"destructive"}
        >
          <Text style={styles.modalText}>
            Are you sure you want to delete your account? {"\n"}
            This action cannot be undone.
          </Text>
        </ModalView>
      </Modal>

      {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            {user.image ? (
              <Image
                src={`https://ape-in-eft.ngrok-free.app` + user.image}
                height={60}
                width={60}
              />
            ) : (
              <Text style={styles.profileAvatarText}>
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : user.email.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name || "User"}</Text>
            {user.company && (
              <Text style={styles.profileCompany}>
                {user.company.name || user.company}
              </Text>
            )}
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>

      {/* Security Section */}
      <Text style={styles.sectionTitle}>Security</Text>

      {/* Change Password */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>Change Password</Text>
            <Text style={styles.cardSubtitle}>
              Update your account password
            </Text>
          </View>
          <Button size="sm">Change</Button>
        </View>
      </View>

      {/* Two-Factor Authentication */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>Two-Factor Authentication</Text>
            <Text style={styles.cardSubtitle}>
              Add an extra layer of security to your account
            </Text>
          </View>
          <Switch
            value={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
            trackColor={{ false: "#3a3a3c", true: "#007AFF" }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      {/* Active Sessions */}
      <Sessions />

      {/* Data & Privacy Section */}
      {/* <Text style={[styles.sectionTitle, styles.sectionMarginTop]}>
        Data & Privacy
      </Text> */}

      {/* AI Training Data */}
      {/* <View style={styles.card}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>AI Training Data</Text>
            <Text style={styles.cardSubtitle}>
              Allow AI to use anonymized data for training
            </Text>
          </View>
          <View style={styles.rowRight}>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>i</Text>
            </TouchableOpacity>
            <Switch
              value={aiTrainingEnabled}
              onValueChange={setAiTrainingEnabled}
              trackColor={{ false: "#3a3a3c", true: "#007AFF" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>
      </View> */}

      {/* Delete Account */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.deleteTextContainer}>
            <TriangleAlert color={colors.dark.danger} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Delete Account</Text>
              <Text style={styles.cardSubtitle}>
                Permanently delete your account and all data
              </Text>
            </View>
          </View>
          <Button
            variant="destructive"
            size="sm"
            onPress={() => setDeleteAcc(true)}
            style={{ flexDirection: "row", gap: 6 }}
          >
            <Trash2 size={16} color={"white"} />
            <Text style={{ color: "white", fontWeight: "600" }}>Delete</Text>
          </Button>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "white",
    //  width: '86%',
    marginBottom: 15,
    textAlign: "center",
  },
  profileCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2c2c2e",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
   //  borderRadius: 32,
    backgroundColor: colors.dark.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark.primary,
    marginBottom: 4,
  },
  profileCompany: {
    fontSize: 14,
    color: "#8e8e93",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#8e8e93",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ffffff",
  },
  sectionMarginTop: {
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 16,
    borderColor: "#2c2c2e",
  },
  sessionsCard: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2c2c2e",
  },
  deleteCard: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#2c2c2e",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#8e8e93",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ff3b30",
  },
  dangerButtonText: {
    color: "#ff3b30",
    fontSize: 15,
    fontWeight: "600",
  },
  sessionItem: {
    marginBottom: 16,
  },
  sessionInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  sessionDevice: {
    fontSize: 15,
    fontWeight: "500",
    color: "#ffffff",
  },
  currentBadge: {
    backgroundColor: "#1e4d2b",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  logoutText: {
    color: "#ff3b30",
    fontSize: 14,
    fontWeight: "500",
  },
  sessionDetails: {
    fontSize: 13,
    color: "#8e8e93",
  },
  divider: {
    height: 1,
    backgroundColor: "#2c2c2e",
    marginBottom: 16,
  },
  logoutAllButton: {
    marginTop: 4,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2c2c2e",
    alignItems: "center",
  },
  logoutAllText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#3a3a3c",
    alignItems: "center",
    justifyContent: "center",
  },
  infoButtonText: {
    color: "#8e8e93",
    fontSize: 12,
    fontWeight: "600",
  },
});
