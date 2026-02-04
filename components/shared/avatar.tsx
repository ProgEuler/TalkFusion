import { useRemoveImageMutation, useUploadImageMutation } from "@/api/auth.api";
import colors from "@/constants/colors";
import { Image } from "expo-image";
import { Camera } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { toast } from "sonner-native";
import { ImagePickerModal } from "./image-picker-modal";

type Props = {
  defaultValue?: string;
  onChange?: (uri: string) => void;
  size?: number;
  editable?: boolean;
};

export function Avatar({ defaultValue, onChange, size = 100, editable = true }: Props) {
  const [imgUri, setImgUri] = useState<string | null>(defaultValue || null);
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [upload, { isLoading: isUploading }] = useUploadImageMutation();
  const [removeImage, { isLoading: isRemoving }] = useRemoveImageMutation();

  const isLoading = isUploading || isRemoving;

  // Update local state when defaultValue changes
  useEffect(() => {
    setImgUri(defaultValue || null);
  }, [defaultValue]);

  const handleUpload = async (uri: string) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      } as any);

      const response = await upload(formData).unwrap();

      // Update the displayed image with the server response
      if (!response?.error) {
        setImgUri(response.image);
        if (onChange) {
          onChange(response.image);
        }
      }

      toast.success("Profile picture updated successfully");
      setLocalUri(null); // Clear local preview
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload image. Please try again.");
      // Revert to previous image on error
      setLocalUri(null);
    }
  };

  const handleRemove = async () => {
    try {
      await removeImage({}).unwrap();
      setImgUri(null);
      setLocalUri(null);
      if (onChange) {
        onChange('');
      }
      toast.success("Profile picture removed successfully");
    } catch (error) {
      console.error('Remove error:', error);
      toast.error("Failed to remove image. Please try again.");
    }
  };

  const handleImageSelected = (uri: string) => {
    // Show local preview immediately
    setLocalUri(uri);

    // Upload the image
    handleUpload(uri);
  };

  const handlePress = () => {
    if (!editable || isLoading) return;
    setShowPicker(true);
  };

  const displayUri = localUri || imgUri;

  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable
        onPress={handlePress}
        disabled={!editable || isLoading}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 3,
          borderColor: colors.dark.primary,
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {displayUri ? (
          <Image
            source={{ uri: displayUri }}
            style={{
              width: size - 6,
              height: size - 6,
              borderRadius: (size - 6) / 2,
              margin: 3,
            }}
          />
        ) : (
          <View
            style={{
              width: size - 6,
              height: size - 6,
              borderRadius: (size - 6) / 2,
              backgroundColor: colors.dark.cardBackground,
              margin: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Camera color={colors.dark.textSecondary} size={size * 0.3} />
          </View>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: size / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}

        {/* Camera icon - only show when editable and not loading */}
        {editable && !isLoading && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: -2,
              backgroundColor: colors.dark.primary,
              padding: size * 0.06,
              borderRadius: size * 0.2,
              borderWidth: 2,
              borderColor: colors.dark.background,
            }}
          >
            <Camera color={"#fff"} size={size * 0.22} strokeWidth={2.5} />
          </View>
        )}
      </Pressable>

      {/* Upload status text */}
      {isLoading && (
        <Text
          style={{
            marginTop: 8,
            fontSize: 12,
            color: colors.dark.textSecondary,
            textAlign: 'center',
          }}
        >
          {isUploading ? 'Uploading...' : 'Removing...'}
        </Text>
      )}

      <ImagePickerModal
        visible={showPicker}
        onClose={() => setShowPicker(false)}
        onImageSelected={handleImageSelected}
        onRemoveImage={handleRemove}
        hasImage={!!displayUri}
      />
    </View>
  );
}
