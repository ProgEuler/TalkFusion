import { ExternalLink } from "lucide-react-native";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const AppointmentItem = ({ appointment, index }) => {
  console.log("Appointment Data:", appointment);
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  async function openCalendarLink() {
    console.log("Opening calendar link:", appointment.event_link);
    await Linking.openURL(appointment.event_link);
  }

  return (
    <View key={index} style={styles.container}>
      {/* Time on the left */}
      <Text style={styles.time}>{formatTime(appointment.start_time)}</Text>

      {/* Main content on the right */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {appointment.title}
        </Text>

        <Text style={styles.client} numberOfLines={1}>
          {appointment.client}
        </Text>

        {/* Location + Email Row */}
        <View style={styles.locationRow}>
          <Text style={styles.locationText} numberOfLines={1}>
            {appointment.location}
          </Text>
          {appointment.email && (
            <Text style={styles.emailText} numberOfLines={1}>
              {" • "} {appointment.email}
            </Text>
          )}
        </View>

        {/* Clickable link with icon */}
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={openCalendarLink}
        >
          <Text style={styles.linkText} numberOfLines={1}>
            Open in Calendar
          </Text>
          <ExternalLink color="#4A90E2" size={16} style={styles.linkIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    minHeight: 80,
    alignItems: "center",
  },
  time: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "600",
    width: 75,
    textAlign: "left",
  },
  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  client: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: "row",
    marginTop: 6,
    flexWrap: "wrap",
  },
  locationText: {
    color: "#999",
    fontSize: 13,
  },
  emailText: {
    color: "#999",
    fontSize: 13,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  linkText: {
    color: "#4A90E2",
    fontSize: 13,
    marginRight: 6,
  },
  linkIcon: {
    marginLeft: 4,
  },
});
