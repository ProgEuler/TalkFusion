import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import { CalendarIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppointmentItem } from "./appointment-item";

interface AppointmentsListProps {
  appointments: any[];
}

export function AppointmentsList({ appointments }: AppointmentsListProps) {
  if (!appointments || appointments.length === 0) {
    return (
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
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlashList
        data={appointments}
        renderItem={({ item, index }) => (
          <AppointmentItem
            appointment={item}
            index={index}
            isLast={index === appointments.length - 1}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    minHeight: 2, // Ensure it has some height or flex
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
});
