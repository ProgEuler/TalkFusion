import { useUploadAiFilesMutation } from "@/api/user-api/company.api";
import colors from "@/constants/colors";
import * as DocumentPicker from "expo-document-picker";
import { CloudUpload, Folder, X } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { toast } from "sonner-native";
import UploadedFiles from "./user-components/uploaded-files";

export default function ImportAiFiles() {
  const [selectedFiles, setSelectedFiles] = useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);
  const [upload, { isLoading }] = useUploadAiFilesMutation();

  const browseFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        setSelectedFiles((prev) => [...prev, ...result.assets]);
      }
    } catch (error) {
      console.log("Error picking file:", error);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files first");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "application/octet-stream",
      } as any);
    });

    try {
      await upload(formData).unwrap();
      toast.success("Uploaded successfully");
      setSelectedFiles([]);
    } catch (error: any) {
      console.log("Upload error:", error);
      toast.error(error?.data?.message || "Upload failed");
    }
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Import files</Text>
      <Text style={styles.importExportDescription}>
        Quickly add information in bulk or Export uploaded files.
      </Text>
      <View style={styles.buttonRow}>
        <Pressable style={styles.exportButton} onPress={browseFiles}>
          <Folder color="#FFFFFF" size={18} />
          <Text style={styles.exportButtonText}>Browse</Text>
        </Pressable>
        <Pressable style={styles.importButton} onPress={uploadFiles}>
          <CloudUpload color="#FFFFFF" size={18} />
          <Text style={styles.importButtonText}>
            {isLoading ? "Uploading.." : "Upload"}
          </Text>
        </Pressable>
      </View>

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <View style={styles.filesContainer}>
          <Text style={styles.filesTitle}>
            Selected Files ({selectedFiles.length})
          </Text>
          {selectedFiles.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <View style={styles.fileInfo}>
                <Text
                  style={styles.fileName}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {file.name}
                </Text>
                <Text style={styles.fileSize}>
                  {file.size
                    ? file.size >= 1024 * 1024
                      ? (file.size / (1024 * 1024)).toFixed(2) + " MB"
                      : (file.size / 1024).toFixed(1) + " KB"
                    : "Unknown size"}
                </Text>
              </View>
              <Pressable
                onPress={() => removeFile(index)}
                style={styles.removeButton}
              >
                <X color={colors.dark.textSecondary} size={16} />
              </Pressable>
            </View>
          ))}
        </View>
      )}

      <UploadedFiles />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
  importExportDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  importButton: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  importButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600" as const,
  },
  exportButton: {
    flex: 1,
    backgroundColor: colors.dark.cardBackground,
    borderWidth: 1,
    borderColor: colors.dark.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  exportButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600" as const,
  },
  filesContainer: {
    marginTop: 16,
    gap: 8,
  },
  filesTitle: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.dark.cardBackground,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  fileInfo: {
    flex: 1,
    marginRight: 8,
  },
  fileName: {
    fontSize: 14,
    color: colors.dark.text,
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  removeButton: {
    padding: 4,
  },
});
