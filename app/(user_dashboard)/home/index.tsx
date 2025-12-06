import { useGetDashboardDataQuery } from "@/api/user-api/dashboard.api";
import Facebook from "@/assets/svgs/facebook.svg";
import WhatsApp from "@/assets/svgs/whatsapp.svg";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import {
    Calendar,
    CheckCircle,
    CreditCard,
    DollarSign,
    Instagram,
    MessageCircle,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppointmentsList } from "./appointments-list";

export default function DashboardScreen() {
  //   const user = useSelector(selectCurrentUser);
  //   const token = useSelector(selectCurrentToken);
  const { data, isLoading, refetch } = useGetDashboardDataQuery(undefined);
  if (isLoading) return <LoadingSpinner />;
  console.log("data ->", data);

  function refetchData() {
    refetch();
  }

  function formatTime(dateString: string) {
    const date = new Date(dateString.replace(" ", "T")); // Fix for iOS
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <Layout>
      <View>
         <Button onPress={refetchData}>Refresh</Button>
      </View>
      {/* stat */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <MessageCircle color="#F59E0B" size={24} />
          </View>
          <Text style={styles.statLabel}>Open Chats</Text>
          <Text style={styles.statValue}>{data.open_chat}</Text>
        </View>

        <View style={styles.statCard}>
          <View
            style={[styles.statIconContainer, { backgroundColor: "#10B98120" }]}
          >
            <Calendar color="#10B981" size={24} />
          </View>
          <Text style={styles.statLabel}>Appointments Today</Text>
          <Text style={styles.statValue}>{data.today_meetings.count}</Text>
        </View>

        <View style={[styles.statCard, { flex: 1 }]}>
          <View
            style={[styles.statIconContainer, { backgroundColor: "#10B98120" }]}
          >
            <Calendar color="#10B981" size={24} />
          </View>
          <Text style={[styles.statLabel, { textAlign: "center" }]}>
            Remaining Appointments
          </Text>
          <Text style={styles.statValue}>{data.today_meetings.count}</Text>
        </View>

        <View style={styles.statCard}>
          <View
            style={[styles.statIconContainer, { backgroundColor: "#10B98120" }]}
          >
            <DollarSign color="#10B981" size={24} />
          </View>
          <Text style={styles.statLabel}>Payments Today</Text>
          <Text style={styles.statValue}>{data.today_meetings.count}</Text>
        </View>
      </View>

      {/* appointments */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Appointments Today</Text>
          <Text style={styles.cardBadge}>
            {data.today_meetings.count} appointments
          </Text>
        </View>
        <View style={styles.appointmentsList}>
            <AppointmentsList appointments={data.today_meetings.list} />
        </View>
      </View>

      {/* payments */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Payments Today</Text>
          <Text style={styles.cardBadge}>
            {data.today_payments.list.length} Paid
          </Text>
        </View>
        <View style={styles.paymentsList}>
          {data.today_payments.list.length > 0 ? (
            data.today_payments.list.map((payment) => (
              <View key={payment.transaction_id} style={styles.listItem}>
                <Text style={styles.paymentName}>{payment.reason}</Text>
                <Text style={styles.paymentType}>{payment.type}</Text>
                <Text style={styles.paymentType}>
                  {formatTime(payment.payment_date)}
                </Text>
                <Text style={styles.paymentAmount}>{payment.amount}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    payment.status === "success"
                      ? styles.statusConfirm
                      : styles.statusPending,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      payment.status === "success"
                        ? styles.statusTextConfirm
                        : styles.statusTextPending,
                    ]}
                  >
                    {payment.status === "success" ? "Confirm" : "Pending"}
                  </Text>
                </View>
              </View>
            ))
          ) : (
           <View style={styles.emptyAppointments}>
              <CreditCard
                color={colors.dark.textSecondary}
                size={48}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>
                No appointments scheduled for today
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* channel */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Channel Status</Text>
        </View>
        <View style={styles.channelsList}>
          <View style={styles.channelItem}>
            <View style={styles.channelIcon}>
              <WhatsApp color="#25D366" width={24} height={24} />
            </View>
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>WhatsApp</Text>
              <Text
                style={{
                  color: data.channel_status.whatsapp
                    ? colors.dark.success
                    : colors.dark.danger,
                }}
              >
                {data.channel_status.whatsapp ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
          <View style={styles.channelItem}>
            <View style={styles.channelIcon}>
              <Instagram color="#25D366" width={24} height={24} />
            </View>
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>Instagram</Text>
              <Text
                style={{
                  color: data.channel_status.instagram
                    ? colors.dark.success
                    : colors.dark.danger,
                }}
              >
                {data.channel_status.instagram ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
          <View style={styles.channelItem}>
            <View style={styles.channelIcon}>
              <Facebook color="#25D366" width={24} height={24} />
            </View>
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>Facebook</Text>
              <Text
                style={{
                  color: data.channel_status.facebook
                    ? colors.dark.success
                    : colors.dark.danger,
                }}
              >
                {data.channel_status.facebook ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* notifications */}
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
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
    alignItems: "center",
    justifyContent: "center",
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
    //  backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 10,
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
  emptyAppointments: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: "center",
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
    gap: 0,
  },
  listItemTime: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    width: 70,
  },
  listItemName: {
    fontSize: 12,
    color: colors.dark.text,
    flex: 1,
    //  fontWeight: "500" as const,
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
