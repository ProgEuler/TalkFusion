import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import {
   ArrowLeft,
  Bell,
  Briefcase,
  Calendar as CalendarIcon,
  ChevronLeft,
  Clock,
  MapPin,
  Send,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddAppointmentScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("12/10/2025");
  const [time, setTime] = useState("12:25 AM");
  const [price, setPrice] = useState("100.00");
  const [reminder, setReminder] = useState("1 Hours Ago");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");

  const handleSendWhatsApp = () => {
    console.log("Send WhatsApp");
    // Handle WhatsApp send logic
  };

  const handleSave = () => {
    console.log("Save appointment", {
      title,
      date,
      time,
      price,
      reminder,
      client,
      location,
      service,
      notes,
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text style={styles.title}>Add Appointments</Text> */}

         {/* back */}
         <TouchableOpacity
            onPress={() => router.replace("/(dashboard)/appointments")}
            style={{ marginBottom: 24 }}
         >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, position: "fixed" }}>
               <ChevronLeft color={colors.dark.textSecondary} size={20}/>
               <Text style={{ color: colors.dark.text, fontSize: 16 }}>{"Back"}</Text>
            </View>
         </TouchableOpacity>
        {/* Title */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Title</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="Appointments title here"
              placeholderTextColor={colors.dark.textSecondary}
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.row}>
          <View style={[styles.fieldContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Date</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="12/10/2025"
                placeholderTextColor={colors.dark.textSecondary}
                value={date}
                onChangeText={setDate}
              />
              <CalendarIcon
                color={colors.dark.textSecondary}
                size={20}
                style={styles.inputIcon}
              />
            </View>
          </View>
          <View style={[styles.fieldContainer, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Time</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="12:25 AM"
                placeholderTextColor={colors.dark.textSecondary}
                value={time}
                onChangeText={setTime}
              />
              <Clock
                color={colors.dark.textSecondary}
                size={20}
                style={styles.inputIcon}
              />
            </View>
          </View>
        </View>

        {/* Price & Reminder */}
        <View style={styles.row}>
          <View style={[styles.fieldContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Price $ ( optional )</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencyPrefix}>$</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="100.00"
                placeholderTextColor={colors.dark.textSecondary}
                value={price}
                onChangeText={(text) => {
                  // Keep only numbers and decimal
                  const cleaned = text.replace(/[^0-9.]/g, "");
                  setPrice(cleaned);
                }}
                keyboardType="decimal-pad"
              />
              <View style={styles.priceIconPlaceholder} />
            </View>
          </View>
          <View style={[styles.fieldContainer, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Reminder</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="1 Hours Ago"
                placeholderTextColor={colors.dark.textSecondary}
                value={reminder}
                onChangeText={setReminder}
              />
              <Bell
                color={colors.dark.textSecondary}
                size={20}
                style={styles.inputIcon}
              />
            </View>
          </View>
        </View>

        {/* Client */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Client</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="Client name here"
              placeholderTextColor={colors.dark.textSecondary}
              value={client}
              onChangeText={setClient}
            />
            <User
              color={colors.dark.textSecondary}
              size={20}
              style={styles.inputIcon}
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="Location here"
              placeholderTextColor={colors.dark.textSecondary}
              value={location}
              onChangeText={setLocation}
            />
            <MapPin
              color={colors.dark.textSecondary}
              size={20}
              style={styles.inputIcon}
            />
          </View>
        </View>

        {/* Service */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Service</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="Service here"
              placeholderTextColor={colors.dark.textSecondary}
              value={service}
              onChangeText={setService}
            />
            <Briefcase
              color={colors.dark.textSecondary}
              size={20}
              style={styles.inputIcon}
            />
          </View>
        </View>

        {/* Notes */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Notes (optional)</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Free text for internal information."
              placeholderTextColor={colors.dark.textSecondary}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      {/* Action Buttons */}
      <View style={styles.footer}>
         <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12}}>
            <TouchableOpacity
               style={styles.sendWhatsAppButton}
               onPress={handleSendWhatsApp}
            >
               <Send color={colors.dark.text} size={20} />
               <Text style={styles.sendWhatsAppText}>Send WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
               <Text style={styles.saveButtonText}>Save Appointments</Text>
            </TouchableOpacity>
         </View>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

    </View>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark.text,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: 15,
    color: colors.dark.text,
    padding: 0,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  currencyPrefix: {
    fontSize: 15,
    color: colors.dark.text,
    fontWeight: "500",
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    fontSize: 15,
    color: colors.dark.text,
    padding: 0,
  },
  priceIconPlaceholder: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  inputIcon: {
    marginLeft: 8,
  },
  textAreaContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 100,
    fontSize: 15,
    color: colors.dark.text,
    padding: 0,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
    backgroundColor: colors.dark.background,
    gap: 12,
  },
  sendWhatsAppButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    paddingVertical: 14,
    gap: 8,
    width: '48%',
    flex: 1,
  },
  sendWhatsAppText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
  },
  saveButton: {
    backgroundColor: colors.dark.success,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
      width: '48%',
      flex: 1,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
  },
});
