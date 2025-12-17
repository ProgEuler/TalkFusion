import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TicketItem = ({ id, subject }: { id: string; subject: string }) => (
  <View style={styles.ticketRow}>
    <Text style={styles.ticketId}>{id}</Text>
    <Text style={styles.ticketSubject} numberOfLines={1}>
      {subject}
    </Text>
  </View>
);

export default function Tickets({ tickets }) {

  return (
    <View style={styles.ticketsContainer}>
      <Text style={styles.sectionTitle}>Open Support Tickets</Text>

      <View style={styles.ticketHeader}>
        <Text style={styles.ticketHeaderId}>ID</Text>
        <Text style={styles.ticketHeaderSubject}>Subject</Text>
      </View>

      <FlashList
        data={tickets}
        renderItem={({ item }: { item: { id: number, description: string }}) => (
          <TicketItem id={item.id.toString()} subject={item.description} />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ticketsContainer: {
    backgroundColor: colors.dark.cardBackground,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 20,
  },
  ticketHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  ticketHeaderId: {
    width: 40,
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark.primary,
  },
  ticketHeaderSubject: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark.primary,
  },
  ticketRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  ticketId: {
    width: 40,
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  ticketSubject: {
    flex: 1,
    fontSize: 14,
    color: colors.dark.text,
  },
});
