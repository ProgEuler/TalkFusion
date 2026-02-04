import * as ExpoImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

type Size = {
    width: number;
    height: number;
};

export async function imagePicker(
    cb: (uri: string | null) => void,
    size?: Size,
    multi?: boolean
) {
    try {
        // Request permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert(
                "Permission Required",
                "Permission to access camera roll is required to change your profile picture.",
                [{ text: "OK" }]
            );
            cb(null);
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsMultipleSelection: multi ? true : false,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8, // Reduced quality for faster upload
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            
            // Manipulate image to optimize size
            const context = ExpoImageManipulator.ImageManipulator.manipulate(asset.uri);

            context.resize({
                width: size?.width || 400, // Increased default size for better quality
                height: size?.height || 400,
            });

            const renderedImage = await context.renderAsync();

            const res = await renderedImage.saveAsync({
                format: ExpoImageManipulator.SaveFormat.JPEG, // Use JPEG for smaller file size
                compress: 0.8,
            });

            cb(res.uri);
        } else {
            cb(null);
        }
    } catch (error) {
        console.error('Image picker error:', error);
        Alert.alert(
            "Error",
            "Failed to select image. Please try again.",
            [{ text: "OK" }]
        );
        cb(null);
    }
}
