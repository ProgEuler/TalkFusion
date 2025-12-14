import { useGetDaysDataQuery } from "@/api/user-api/calendar.api";
import AppointmentsByDay from "@/components/appointments-by-day";
import ErrorScreen from "@/components/Error";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import GoogleCalendar from "./integrations/google-calendar";

export default function AppointmentsScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<number>(
    new Date().getDate()
  );
  const [viewMode, setViewMode] = useState<"today" | "week" | "month">("month");
  const [month, setMonth] = useState<number>(12);
  const [year, setYear] = useState<number>(2025);

  const {
    data: daysData,
    isLoading,
    isError,
    refetch,
  } = useGetDaysDataQuery({
    month: month,
    year: year,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorScreen onRetry={refetch} />;

  const generateMarkedDatesFromArray = (dates, style) => {
    return dates.reduce((acc, date) => {
      acc[date] = style;
      return acc;
    }, {});
  };

  const convertToDates = ({ days, month, year }) => {
    return days.map((day) => {
      const yyyy = year;
      const mm = String(month).padStart(2, "0");
      const dd = String(day).padStart(2, "0");

      return `${yyyy}-${mm}-${dd}`;
    });
  };

  console.log("Selected date:", selectedDate);
  const result = convertToDates({ days: daysData.days, month, year });

  const markedDates = generateMarkedDatesFromArray(result, {
    selected: true,
    marked: true,
    selectedColor: colors.dark.primary,
    dotColor: colors.dark.primary,
  });

  return (
    <Layout
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {/* View Mode Buttons */}
      <View style={styles.viewModeContainer}>
        <Button
          variant={viewMode === "today" ? "primary" : "outline"}
          size="sm"
          style={styles.viewModeButton}
          onPress={() => setViewMode("today")}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === "today" && styles.viewModeTextActive,
            ]}
          >
            {selectedDate}
          </Text>
        </Button>

        <Button
          variant={viewMode === "week" ? "primary" : "outline"}
          size="sm"
          style={styles.viewModeButton}
          onPress={() => setViewMode("week")}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === "week" && styles.viewModeTextActive,
            ]}
          >
            {month}
          </Text>
        </Button>

        <Button
          variant={viewMode === "month" ? "primary" : "outline"}
          size="sm"
          style={styles.viewModeButton}
          onPress={() => setViewMode("month")}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === "month" && styles.viewModeTextActive,
            ]}
          >
            {year}
          </Text>
        </Button>

        <Button
          onPress={() => router.push("/add-appointment")}
          variant="small"
          size="sm"
          style={{ marginLeft: 0 }}
        >
          Add Appointment
        </Button>
      </View>

      {/* Monthly View Section */}
      <View style={styles.section}>
        <Calendar
          onDayPress={(day) => {
            // console.log("selected day", day.day);
            setSelectedDate(day.day);
          }}
          onMonthChange={(data) => {
            setMonth(data.month);
            setYear(data.year);
          }}
          markedDates={{
            ...markedDates,
            [selectedDate
              ? `${year}-${String(month).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
              : ""]: {
              selected: true,
              selectedColor: colors.dark.success,
            },
          }}
          hideExtraDays
          enableSwipeMonths
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: colors.dark.border,
            height: 350,
          }}
          theme={{
            calendarBackground: colors.dark.cardBackground,
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#ffffff",
            selectedDayTextColor: "#ffffff",
            todayTextColor: colors.dark.primary,
            todayBackgroundColor: colors.dark.primary + "20",
            todayDotColor: colors.dark.primary,
            dayTextColor: colors.dark.text,
            textDisabledColor: colors.dark.textSecondary,
            monthTextColor: colors.dark.text,
            arrowColor: colors.dark.text,
          }}
        />
      </View>

      <GoogleCalendar />

      {/* Today's Appointments Section */}
      <AppointmentsByDay day={selectedDate} month={month} year={year} />

      {/* Sync Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sync Information</Text>
        <Text style={styles.syncInfoText}>
          All appointments are automatically synchronized with your connected
          calendars. Changes made in this agenda will reflect in Google Calendar
          and vice versa.
        </Text>
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
  dateNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  navButton: {
    padding: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
  },
  viewModeContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    //  flexWrap: "wrap",
  },
  viewModeButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.dark.cardBackground,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  viewModeButtonActive: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primary,
  },
  viewModeText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: "500",
  },
  viewModeTextActive: {
    color: colors.dark.text,
    fontWeight: "600",
  },
  addButton: {
    marginLeft: "auto",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.dark.primary,
  },
  addButtonText: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {},
  sectionDate: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  monthNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  monthNavButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: 12,
    padding: 8,
    backgroundColor: colors.dark.cardBackground,
  },
  dayHeader: {
    width: "14.28%",
    paddingVertical: 8,
    alignItems: "center",
  },
  dayHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.dark.textSecondary,
  },
  calendarDay: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 2,
    position: "relative",
  },
  calendarDayOtherMonth: {
    opacity: 0.3,
  },
  calendarDayToday: {
    backgroundColor: colors.dark.primary + "80",
  },
  calendarDaySelected: {
    backgroundColor: colors.dark.primary + "60",
    borderWidth: 2,
    borderColor: colors.dark.primary,
  },
  calendarDayText: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
  },
  calendarDayTextOtherMonth: {
    color: colors.dark.textSecondary,
  },
  calendarDayTextToday: {
    color: colors.dark.text,
    fontWeight: "700",
  },
  calendarDayTextSelected: {
    color: colors.dark.text,
    fontWeight: "600",
  },
  appointmentProfileIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
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
  appointmentsList: {
    gap: 8,
  },
  appointmentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    gap: 12,
  },
  appointmentTime: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    width: 80,
  },
  appointmentName: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
    flex: 1,
  },
  autoSyncText: {
    fontSize: 14,
    color: colors.dark.primary,
    fontWeight: "500",
  },
  integrationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
    gap: 16,
  },
  googleLogoText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
  },
  integrationInfo: {
    flex: 1,
  },
  integrationName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 8,
  },
  connectButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: colors.dark.primary,
  },
  connectButtonText: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "600",
  },
  syncInfoText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
  },
});
