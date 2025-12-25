import { useGetUploadedFilesQuery } from "@/api/user-api/company.api";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import { Download, FileText } from "lucide-react-native";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";

const API_URL = process.env.EXPO_PUBLIC_API_MEDIA_URL;

export default function UploadedFiles() {
  const { data, refetch } = useGetUploadedFilesQuery(undefined);

  const getFileName = (filePath: string) => {
    return filePath.split("/").pop() || "Unknown File";
  };

  const downloadFile = async (url: string) => {
    try {
      const fullUrl = url.startsWith("http") ? url : `${API_URL}${url}`;
      await Linking.openURL(fullUrl);
    } catch (error) {
      toast.error("Failed to open URL");
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.fileItem}>
      <View style={styles.fileInfoContainer}>
        <View style={styles.iconContainer}>
          <FileText size={20} color={colors.dark.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.fileName} numberOfLines={1}>
            {getFileName(item.file)}
          </Text>
          <Text style={styles.dateText}>
            {new Date(item.uploaded_at).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.downloadButton}
        onPress={() => downloadFile(item.file)}
      >
        <Download size={20} color={colors.dark.textSecondary} />
      </Pressable>
    </View>
  );

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Files</Text>
      <View style={{ height: data.length * 70, minHeight: 100 }}>
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 12,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.dark.cardBackground,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  fileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.dark.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark.text,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  downloadButton: {
    padding: 8,
  },
});
