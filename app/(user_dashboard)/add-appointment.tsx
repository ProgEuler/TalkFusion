import KeyboardAvoidingScrollView from "@/components/layout/KeyboardAvoidingScrollView";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { RNDatePicker } from "@/components/ui/date-picker";
import { RNInput } from "@/components/ui/input";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormData = {
  title?: string;
  date?: Date;
  time?: string;
  price?: string;
  reminder?: string;
  client?: string;
  location?: string;
  service?: string;
  notes?: string;
};

export default function AddAppointmentScreen() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("12/10/2025");
  //   const [time, setTime] = useState("12:25 AM");
  const [price, setPrice] = useState("100.00");
  const [reminder, setReminder] = useState("1 Hours Ago");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");

  const [formData, setFormData] = useState<FormData>({});

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSendWhatsApp = () => {
    console.log("Send WhatsApp");
    // Handle WhatsApp send logic
  };

  const handleSave = () => {
    console.log("Save appointment", formData);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Layout>
      {/* <Text style={styles.title}>Add Appointments</Text> */}

      {/* back */}
      <TouchableOpacity
        onPress={() => router.replace("/(dashboard)/appointments")}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 6,
            position: "fixed",
            marginRight: 16,
          }}
        >
          <ChevronLeft color={colors.dark.textSecondary} size={20} />
          <Text style={{ color: colors.dark.text, fontSize: 16 }}>
            {"Back"}
          </Text>
        </View>
      </TouchableOpacity>
      {/* Title */}
      <View style={styles.fieldContainer}>
        {/* <Text style={styles.label}>Title</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="Appointments title here"
            placeholderTextColor={colors.dark.textSecondary}
            value={title}
            onChangeText={setTitle}
          />
        </View> */}
        <RNInput
          label="Title"
          onChangeText={(t) => handleInputChange("title", t)}
        />
      </View>

      {/* Date & Time */}
      <View style={styles.row}>
        <View
          style={[
            styles.fieldContainer,
            { flex: 1, marginRight: 8, flexDirection: "row", gap: 6 },
          ]}
        >
          <View style={{ width: "50%" }}>
            <RNDatePicker
              onChangeDate={(date) => handleInputChange("date", date)}
              label="Date"
              value={formData.date}
            />
          </View>
          <View style={{ width: "50%" }}>
            <RNDatePicker
              onChangeDate={(time) => handleInputChange("time", time)}
              label="Time"
              value={formData.time}
            />
          </View>
        </View>
      </View>

      {/* Price & Reminder */}
      <View style={{ flex: 1, flexDirection: "row", gap: 6 }}>
        <View style={{ width: "50%" }}>
          <RNInput
            label="Price"
            onChangeText={(t) => handleInputChange("price", t)}
          />
        </View>
        <View style={{ width: "48%" }}>
          <RNInput
            label="Reminder"
            onChangeText={(t) => handleInputChange("reminder", t)}
          />
        </View>
      </View>

      <RNInput
        label="Client"
        onChangeText={(t) => handleInputChange("client", t)}
      />

      <RNInput
        label="Location"
        onChangeText={(t) => handleInputChange("location", t)}
      />

      {/* Service */}
      {/* <View style={styles.fieldContainer}>
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
      </View> */}
      <RNInput
        label="Service"
        onChangeText={(t) => handleInputChange("service", t)}
      />
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
            onChange={(t) => handleInputChange("notes", notes)}
          />
        </View>
      </View>
      {/* Action Buttons */}
      <View style={styles.footer}>
        <View
          style={{
            flexDirection: "row",
            gap: 12,
          }}
        >
          <Button onPress={handleSendWhatsApp}>Send WhatsApp</Button>
          <Button style={styles.saveButton} onPress={handleSave}>
            Save Appointments
          </Button>
        </View>
        <Button variant="outline" onPress={handleCancel}>
          Cancel
        </Button>
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
    width: "50%",
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
    width: "50%",
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
