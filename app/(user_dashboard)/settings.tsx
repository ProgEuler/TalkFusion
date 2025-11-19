import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { ModalView } from "@/components/ui/modal-view";
import { Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [aiTrainingEnabled, setAiTrainingEnabled] = useState(false);
  const [deleteAcc, setDeleteAcc] = useState(false);

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
        >
          <Text style={styles.modalText}>
            Are you sure you want to delete your account? {'\n'}
            This action cannot be undone.
          </Text>
        </ModalView>
      </Modal>

      <View>

      </View>
      {/* Security Section */}
      <Text style={styles.sectionTitle}>Security</Text>

      {/* Change Password */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
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
          <View style={styles.textContainer}>
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
      <View style={styles.sessionsCard}>
        <View style={styles.sessionItem}>
          <View style={styles.sessionInfo}>
            <Text style={styles.sessionDevice}>MacBook Pro • Chrome</Text>
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>Current</Text>
            </View>
          </View>
          <Text style={styles.sessionDetails}>
            192.168.1.100 • San Francisco, CA • Current session
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.sessionItem}>
          <View style={styles.sessionInfo}>
            <Text style={styles.sessionDevice}>iPhone • Safari</Text>
            <Button variant="destructive_outline" size="sm">
              Logout
            </Button>
          </View>
          <Text style={styles.sessionDetails}>
            192.168.1.101 • San Francisco, CA • 2 hours ago
          </Text>
        </View>

        <Button variant="outline">Logout from all devices</Button>
      </View>

      {/* Data & Privacy Section */}
      <Text style={[styles.sectionTitle, styles.sectionMarginTop]}>
        Data & Privacy
      </Text>

      {/* Export My Data */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Export My Data</Text>
            <Text style={styles.cardSubtitle}>
              Download a copy of all your data
            </Text>
          </View>
          <Button size="sm">Export</Button>
        </View>
      </View>

      {/* AI Training Data */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
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
      </View>

      {/* Delete Account */}
      <View style={styles.deleteCard}>
        <View style={styles.cardContent}>
          <View style={styles.deleteTextContainer}>
            <View style={styles.warningIcon}>
              <Text style={styles.warningIconText}>⚠</Text>
            </View>
            <View style={styles.textContainer}>
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
          >
            <Trash2 size={16} color={"white"} /> Delete
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
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 20,
    marginBottom: 12,
  },
  sectionMarginTop: {
    marginTop: 32,
  },
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
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
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  deleteTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  warningIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  warningIconText: {
    fontSize: 18,
    color: "#ff3b30",
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
    lineHeight: 18,
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
  currentBadgeText: {
    color: "#32d74b",
    fontSize: 11,
    fontWeight: "600",
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
