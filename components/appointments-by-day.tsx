import { useGetBookingsByDateQuery } from "@/api/user-api/calendar.api";
import { AppointmentItem } from "@/app/(user_dashboard)/home/appointment-item";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import { CalendarIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AppointmentsByDay({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) {
  const { data, isLoading, isError } = useGetBookingsByDateQuery({
    day,
    month,
    year,
  });

  if (isLoading)
    return (
      <Text style={{ color: colors.dark.text }}>Loading appointments...</Text>
    );
  console.log("Appointments data for", day, month, year, ":", data);
  if (isError)
    return (
      <Text style={{ color: colors.dark.text }}>
        Error loading appointments.
      </Text>
    );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Appointments</Text>
        <Text style={styles.sectionDate}>{day + "-" + month + "-" + year}</Text>
      </View>
      {data.bookings.length === 0 ? (
        <View style={styles.emptyAppointments}>
          <CalendarIcon
            color={colors.dark.textSecondary}
            size={48}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>
            No appointments scheduled for today
          </Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlashList
            data={data.bookings}
            renderItem={({ item, index }) => (
              <AppointmentItem
                appointment={item}
                index={index}
                isLast={index === data.bookings.length - 1}
              />
            )}
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    minHeight: 2,
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
  section: {
    marginBottom: 24,
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.dark.border,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
   color: colors.dark.textSecondary
  },
  sectionDate: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
});
