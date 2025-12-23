import { useDisableAllMutation, useEnableAllMutation } from "@/api/admin-api/integration-api.api";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import colors from "@/constants/colors";
import { Briefcase, Eye } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";

interface IntegrationItem {
  id: string;
  name: string;
  email: string;
  company: string;
}

const integrationsData: IntegrationItem[] = [
  {
    id: "1",
    name: "Jane Cooper",
    email: "felicia.reid@example.com",
    company: "Louis Vuitton",
  },
  {
    id: "2",
    name: "Jane Cooper",
    email: "felicia.reid@example.com",
    company: "Louis Vuitton",
  },
  {
    id: "3",
    name: "Jane Cooper",
    email: "felicia.reid@example.com",
    company: "Louis Vuitton",
  },
  {
    id: "4",
    name: "Jane Cooper",
    email: "felicia.reid@example.com",
    company: "Louis Vuitton",
  },
];

export default function IntegrationsPage() {
  const [enableFacebookApi, { isLoading: facebookEnableLoading }] =
    useEnableAllMutation();
  const [disableFacebookApi, { isLoading: facebookDisableLoading }] =
    useDisableAllMutation();

  const [enableWhatsappApi, { isLoading: whatsappEnableLoading }] =
    useEnableAllMutation();
  const [disableWhatsappApi, { isLoading: whatsappDisableLoading }] =
    useDisableAllMutation();

  const approveChannel = async (channel: string, enableApi: any) => {
    try {
      const res = await enableApi({ channel_name: channel });
      toast.success(res.data.status);
      console.log(res.data.status)
    } catch (err) {
      toast.error("resError");
    }
  };
  const disableChannel = async (channel: string, disableApi: any) => {
    try {
      const res = await disableApi({ channel_name: channel });
      toast.success(res.data.status);
      console.log(res.data.status)
    } catch (err) {
      toast.error("resError");
    }
  };

  return (
    <Layout>
      {/* Header Card */}
      <View>
        <View style={styles.headerCard}>
          <View>
            <Text style={styles.headerCardTitle}>Facebook APP</Text>
            <Text style={styles.headerCardSubtitle}>
              Approve or manage access keys
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <Button size="sm" onPress={() => approveChannel("facebook", enableFacebookApi)} isLoading={facebookEnableLoading}>
              All Enable
            </Button>
            <Button
              size="sm"
              variant="destructive_outline"
              onPress={() => disableChannel("facebook", disableFacebookApi)}
              isLoading={facebookDisableLoading}
            >
              All Disable
            </Button>
          </View>
        </View>

        <View style={styles.headerCard}>
          <View>
            <Text style={styles.headerCardTitle}>Whatsapp Business</Text>

            <Text style={styles.headerCardSubtitle}>
              Messaging api and support
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <Button size="sm" onPress={() => approveChannel("whatsapp", enableWhatsappApi)} isLoading={whatsappEnableLoading}>
              All Enable
            </Button>
            <Button
              size="sm"
              variant="destructive_outline"
              onPress={() => disableChannel("whatsapp", disableWhatsappApi)}
              isLoading={whatsappDisableLoading}
            >
              All Disable
            </Button>
          </View>
        </View>
        {/* <View style={styles.headerCard}>
                <View>
                    <Text style={styles.headerCardTitle}>Facebook API</Text>
                    <Text style={styles.headerCardSubtitle}>Approve or manage access keys</Text>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity style={[styles.actionButton, styles.enableButton]}>
                        <Text style={styles.enableButtonText}>All Enable</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.disableButton]}>
                        <Text style={styles.disableButtonText}>All Disable</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
      </View>

      {/* Integrations List */}
      <View style={styles.listContainer}>
        {integrationsData.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>

              <View style={styles.row}>
                <Text style={styles.itemEmail}>{item.email}</Text>
              </View>

              <View style={styles.row}>
                <Briefcase size={14} color={colors.dark.primary} />
                <Text style={styles.itemCompany}>{item.company}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewButton}>
              <Eye size={16} color={colors.dark.primary} />
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    borderRadius: 16,
    backgroundColor: colors.dark.cardBackground,
    padding: 12,
    marginBottom: 12
  },
  headerCardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
  },
  headerCardSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  enableButton: {
    backgroundColor: colors.dark.primary,
  },
  disableButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.dark.danger,
  },
  enableButtonText: {
    color: "white",
    fontWeight: "600",
  },
  disableButtonText: {
    color: colors.dark.danger,
    fontWeight: "600",
  },
  listContainer: {
    gap: 16,
  },
  itemCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemInfo: {
    gap: 6,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.primary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemEmail: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  itemCompany: {
    fontSize: 14,
    color: colors.dark.text,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark.primary,
  },
  viewButtonText: {
    color: colors.dark.primary,
    fontWeight: "600",
  },
});
