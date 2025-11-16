import Google from "@/assets/svgs/google.svg";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const generateCalendarDays = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month === 0 ? 11 : month - 1);
  const daysToShow: { day: number; isCurrentMonth: boolean }[] = [];

  // Previous month's trailing days
  const prevMonthStart = prevMonthDays - firstDay + 1;
  for (let i = prevMonthStart; i <= prevMonthDays; i++) {
    daysToShow.push({ day: i, isCurrentMonth: false });
  }

  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    daysToShow.push({ day: i, isCurrentMonth: true });
  }

  // Next month's leading days (fill to 42 cells for 6 weeks)
  const totalCells = 42;
  const remainingCells = totalCells - daysToShow.length;
  for (let i = 1; i <= remainingCells; i++) {
    daysToShow.push({ day: i, isCurrentMonth: false });
  }

  return { days: daysToShow, firstDay, daysInMonth };
};

export default function AppointmentsScreen() {
  const router = useRouter();
  // Set initial date to October 2025 to match the design
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 12)); // October 12, 2025
  const [viewMode, setViewMode] = useState<"today" | "week" | "month">("month");

  // Mock "today" date for the app (October 7, 2025 in the design)
  const mockToday = new Date(2025, 9, 7);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const selectedDay = selectedDate.getDate();

  const { days, firstDay, daysInMonth } = generateCalendarDays(
    currentYear,
    currentMonth
  );

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatDate = (date: Date) => {
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (direction === "prev") {
      newDate.setDate(selectedDate.getDate() - 1);
    } else {
      newDate.setDate(selectedDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const isToday = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    // Use mockToday for design purposes (October 7, 2025)
    return (
      day === mockToday.getDate() &&
      currentMonth === mockToday.getMonth() &&
      currentYear === mockToday.getFullYear()
    );
  };

  const isSelected = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    return (
      day === selectedDay &&
      currentMonth === selectedMonth &&
      currentYear === selectedYear
    );
  };

  const hasAppointment = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    // Mock: check if day has appointment (e.g., day 9 in October 2025)
    // Month 9 = October (0-indexed)
    return day === 9 && currentMonth === 9 && currentYear === 2025;
  };

  const handleDateSelect = (
    day: number,
    isCurrentMonth: boolean,
    dayIndex: number
  ) => {
    if (!isCurrentMonth) {
      // Navigate to that month
      const newDate = new Date(currentYear, currentMonth, day);
      // Determine if it's previous or next month based on position in grid
      // Days before firstDay are from previous month
      // Days after firstDay + daysInMonth are from next month
      if (dayIndex < firstDay) {
        // Previous month
        newDate.setMonth(currentMonth - 1);
      } else if (dayIndex >= firstDay + daysInMonth) {
        // Next month
        newDate.setMonth(currentMonth + 1);
      }
      setCurrentDate(newDate);
      setSelectedDate(newDate);
    } else {
      const newDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(newDate);
    }
  };

  // Mock appointments data
  const todayAppointments: any[] = [];

  return (
    <Layout>
      {/* add appointment */}
      <View style={{ marginBottom: 20 }}>
        <Button
          onPress={() => router.push("/(dashboard)/add-appointment")}
          variant="small"
          size="sm"
        >
          + Add Appointments
        </Button>
      </View>
      {/* Date Navigation */}
      <View style={styles.dateNavigation}>
        <TouchableOpacity
          onPress={() => navigateDate("prev")}
          style={styles.navButton}
        >
          <ChevronLeft color={colors.dark.text} size={20} />
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        <TouchableOpacity
          onPress={() => navigateDate("next")}
          style={styles.navButton}
        >
          <ChevronRight color={colors.dark.text} size={20} />
        </TouchableOpacity>
      </View>

      {/* View Mode Buttons */}
      <View style={styles.viewModeContainer}>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "today" && styles.viewModeButtonActive,
          ]}
          onPress={() => setViewMode("today")}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === "today" && styles.viewModeTextActive,
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "week" && styles.viewModeButtonActive,
          ]}
          onPress={() => setViewMode("week")}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === "week" && styles.viewModeTextActive,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "month" && styles.viewModeButtonActive,
          ]}
          onPress={() => setViewMode("month")}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === "month" && styles.viewModeTextActive,
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>
      </View>

      {/* Monthly View Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monthly View</Text>
          <Text style={styles.sectionDate}>{formatDate(selectedDate)}</Text>
        </View>

        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity
            onPress={() => navigateMonth("prev")}
            style={styles.monthNavButton}
          >
            <ChevronLeft color={colors.dark.text} size={20} />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          <TouchableOpacity
            onPress={() => navigateMonth("next")}
            style={styles.monthNavButton}
          >
            <ChevronRight color={colors.dark.text} size={20} />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {/* Day Headers */}
          {dayNames.map((day) => (
            <View key={day} style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>{day}</Text>
            </View>
          ))}

          {/* Calendar Days */}
          {days.map((dayData, index) => {
            const { day: dayNumber, isCurrentMonth: isCurrentMonthDay } =
              dayData;
            const isTodayDay = isToday(dayNumber, isCurrentMonthDay);
            const isSelectedDay = isSelected(dayNumber, isCurrentMonthDay);
            const hasAppointmentDay = hasAppointment(
              dayNumber,
              isCurrentMonthDay
            );

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.calendarDay,
                  !isCurrentMonthDay && styles.calendarDayOtherMonth,
                  isTodayDay && styles.calendarDayToday,
                  isSelectedDay && styles.calendarDaySelected,
                ]}
                onPress={() =>
                  handleDateSelect(dayNumber, isCurrentMonthDay, index)
                }
              >
                <Text
                  style={[
                    styles.calendarDayText,
                    !isCurrentMonthDay && styles.calendarDayTextOtherMonth,
                    isTodayDay && styles.calendarDayTextToday,
                    isSelectedDay && styles.calendarDayTextSelected,
                  ]}
                >
                  {dayNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Today's Appointments Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Appointments</Text>
          <Text style={styles.sectionDate}>{formatDate(selectedDate)}</Text>
        </View>
        {todayAppointments.length === 0 ? (
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
          <View style={styles.appointmentsList}>
            {todayAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentItem}>
                <Text style={styles.appointmentTime}>{appointment.time}</Text>
                <Text style={styles.appointmentName}>{appointment.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Calendar Integration Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Calendar Integration</Text>
          <Text style={styles.autoSyncText}>Auto-sync enabled</Text>
        </View>
        <View style={styles.integrationCard}>
          <Google width={48} height={48} />
          <View style={styles.integrationInfo}>
            <Text style={styles.integrationName}>Google Calendars</Text>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
    justifyContent: "center"
  },
  viewModeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
  },
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
