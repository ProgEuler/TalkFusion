import colors from "@/constants/colors";
import {
  Calendar,
  CheckCircle,
  MessageCircle,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WhatsApp from "@/assets/svgs/whatsapp.svg";
import Facebook from "@/assets/svgs/facebook.svg";
import { Layout } from "@/components/layout/Layout";
interface Appointment {
  id: string;
  time: string;
  name: string;
  status: "confirm" | "pending";
}

interface Payment {
  id: string;
  name: string;
  type: string;
  amount: string;
  status: "confirm" | "pending";
}

const appointmentsToday: Appointment[] = [
  { id: "1", time: "11:23 pm", name: "Courtney", status: "confirm" },
  { id: "2", time: "11:23 pm", name: "Tanya", status: "confirm" },
  { id: "3", time: "10:41 pm", name: "Savannah", status: "pending" },
  { id: "4", time: "08:20 pm", name: "Gloria", status: "pending" },
  { id: "5", time: "06:41 pm", name: "Colleen", status: "confirm" },
  { id: "6", time: "02:40 pm", name: "Kristen", status: "confirm" },
  { id: "7", time: "01:49 pm", name: "Bayside", status: "confirm" },
  { id: "8", time: "10:41 pm", name: "Jane", status: "confirm" },
];

const paymentsToday: Payment[] = [
  {
    id: "1",
    name: "Cody",
    type: "Consultation",
    amount: "$120.00",
    status: "confirm",
  },
  {
    id: "2",
    name: "Jacob",
    type: "Initial Visit",
    amount: "$100.00",
    status: "confirm",
  },
  {
    id: "3",
    name: "Shawn",
    type: "Consultation",
    amount: "$100.00",
    status: "pending",
  },
  {
    id: "4",
    name: "Ronald",
    type: "Service Package",
    amount: "$120.00",
    status: "confirm",
  },
  {
    id: "5",
    name: "Brandon",
    type: "Initial Visit",
    amount: "$120.00",
    status: "pending",
  },
  {
    id: "6",
    name: "Leslie",
    type: "Consultation",
    amount: "$120.00",
    status: "confirm",
  },
];

export default function DashboardScreen() {

  return (
   <Layout>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { flex: 1 }]}>
            <View style={styles.statIconContainer}>
              <MessageCircle color="#F59E0B" size={24} />
            </View>
            <Text style={styles.statLabel}>Open Chats</Text>
            <Text style={styles.statSubLabel}>All caught up</Text>
            <Text style={styles.statValue}>0</Text>
          </View>

          <View style={[styles.statCard, { flex: 1 }]}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: "#10B98120" },
              ]}
            >
              <Calendar color="#10B981" size={24} />
            </View>
            <Text style={styles.statLabel}>Appointments Today</Text>
            <Text style={styles.statSubLabel}>2 more than yesterday</Text>
            <Text style={styles.statValue}>10</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Appointments Today</Text>
            <Text style={styles.cardBadge}>8 appointments</Text>
          </View>
          <View style={styles.appointmentsList}>
            {appointmentsToday.map((appointment) => (
              <View key={appointment.id} style={styles.listItem}>
                <Text style={styles.listItemTime}>{appointment.time}</Text>
                <Text style={styles.listItemName}>{appointment.name}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    appointment.status === "confirm"
                      ? styles.statusConfirm
                      : styles.statusPending,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      appointment.status === "confirm"
                        ? styles.statusTextConfirm
                        : styles.statusTextPending,
                    ]}
                  >
                    {appointment.status === "confirm" ? "Confirm" : "Pending"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Payments Today</Text>
            <Text style={styles.cardBadge}>6 Paid</Text>
          </View>
          <View style={styles.paymentsList}>
            {paymentsToday.map((payment) => (
              <View key={payment.id} style={styles.listItem}>
                <Text style={styles.paymentName}>{payment.name}</Text>
                <Text style={styles.paymentType}>{payment.type}</Text>
                <Text style={styles.paymentAmount}>{payment.amount}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    payment.status === "confirm"
                      ? styles.statusConfirm
                      : styles.statusPending,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      payment.status === "confirm"
                        ? styles.statusTextConfirm
                        : styles.statusTextPending,
                    ]}
                  >
                    {payment.status === "confirm" ? "Confirm" : "Pending"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Channel Status</Text>
            <Text style={styles.cardBadge}>4 Online</Text>
          </View>
          <View style={styles.channelsList}>
            <View style={styles.channelItem}>
              <View style={styles.channelIcon}>
                <WhatsApp color="#25D366" width={24} height={24} />
              </View>
              <View style={styles.channelInfo}>
                <Text style={styles.channelName}>WhatsApp</Text>
                <Text style={styles.channelStatus}>Active</Text>
              </View>
            </View>
            <View style={styles.channelItem}>
              <View style={styles.channelIcon}>
                <Facebook color="#1877F2" width={24} height={24} />
              </View>
              <View style={styles.channelInfo}>
                <Text style={styles.channelName}>Facebook</Text>
                <Text style={styles.channelStatus}>Active</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Notifications/Alerts</Text>
            <Text
              style={[
                styles.cardBadge,
                { backgroundColor: colors.dark.success + "20" },
              ]}
            >
              All systems normal
            </Text>
          </View>
          <View style={styles.alertContainer}>
            <CheckCircle color={colors.dark.success} size={48} />
            <Text style={styles.alertTitle}>No issues detected</Text>
            <Text style={styles.alertSubtitle}>
              All systems are running smoothly
            </Text>
          </View>
        </View>
        </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F59E0B20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "600" as const,
    marginBottom: 4,
  },
  statSubLabel: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    color: colors.dark.text,
    fontWeight: "700" as const,
  },
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.dark.text,
  },
  cardBadge: {
    fontSize: 12,
    color: colors.dark.primary,
    backgroundColor: colors.dark.primary + "20",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "600" as const,
  },
  appointmentsList: {
    gap: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.dark.background,
    borderRadius: 8,
    gap: 12,
  },
  listItemTime: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    width: 70,
  },
  listItemName: {
    fontSize: 14,
    color: colors.dark.text,
    flex: 1,
    fontWeight: "500" as const,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusConfirm: {
    backgroundColor: colors.dark.success + "20",
  },
  statusPending: {
    backgroundColor: colors.dark.danger + "20",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
  statusTextConfirm: {
    color: colors.dark.success,
  },
  statusTextPending: {
    color: colors.dark.danger,
  },
  paymentsList: {
    gap: 8,
  },
  paymentName: {
    fontSize: 14,
    color: colors.dark.text,
    width: 80,
    fontWeight: "500" as const,
  },
  paymentType: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    flex: 1,
  },
  paymentAmount: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "600" as const,
    marginRight: 12,
  },
  channelsList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  channelItem: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: colors.dark.background,
    borderRadius: 8,
    gap: 16,
  },
  channelIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.dark.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 15,
    color: colors.dark.text,
    fontWeight: "600" as const,
    marginBottom: 4,
  },
  channelStatus: {
    fontSize: 13,
    color: colors.dark.success,
    fontWeight: "500" as const,
  },
  alertContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  alertTitle: {
    fontSize: 16,
    color: colors.dark.text,
    fontWeight: "600" as const,
    marginTop: 12,
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
});
