import { RNInput } from "@/components/ui/input";
import colors from "@/constants/colors";
import { Calendar, Clock } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

type Props = {
    label?: string;
    value?: Date;
    onChangeDate?: (date: Date) => void;
    mode: "date" | "time" | "datetime";
    error?: boolean;
};

export function RNDatePicker({ label, onChangeDate, value, mode, error }: Props) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        if (onChangeDate) onChangeDate(date);
        hideDatePicker();
    };

    const formatDisplayValue = (date: Date | undefined) => {
        if (!date) return "";
        
        switch (mode) {
            case 'time':
                return date.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false // Use 24-hour format for consistency
                });
            case 'datetime':
                return date.toLocaleString([], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            case 'date':
            default:
                return date.toLocaleDateString([], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
        }
    };

    return (
        <>
            <Pressable
                onPress={showDatePicker}
                pointerEvents="box-only"
                style={{
                    width: "100%",
                    position: "relative",
                }}
            >
                <RNInput
                    label={label}
                    value={formatDisplayValue(value)}
                    editable={false}
                    pointerEvents="none"
                    error={error}
                    style={{
                        opacity: 1, // Ensure input is visible
                    }}
                />
                {mode === "date" ? (
                    <Calendar
                        color={colors.dark.textSecondary}
                        size={20}
                        style={{
                            position: "absolute",
                            right: 12,
                            top: 18,
                        }}
                    />
                ) : (
                    <Clock
                        color={colors.dark.textSecondary}
                        size={20}
                        style={{
                            position: "absolute",
                            right: 12,
                            top: 18,
                        }}
                    />
                )}
            </Pressable>

            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={value ?? new Date()}
                // iOS specific styling
                modalStyleIOS={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                pickerContainerStyleIOS={{
                    backgroundColor: colors.dark.cardBackground,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    minHeight: 200, // Ensure minimum height for visibility
                }}
                pickerStyleIOS={{
                    width: "100%",
                    backgroundColor: "transparent",
                }}
                confirmTextIOS="Confirm"
                cancelTextIOS="Cancel"
                buttonTextColorIOS={colors.dark.primary}
                // Force dark mode for consistency
                isDarkModeEnabled={true}
                // Use spinner display for better iOS compatibility
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                // Additional props for better iOS support
                textColor={colors.dark.text}
            />
        </>
    );
}
