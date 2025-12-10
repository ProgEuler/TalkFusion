import { RNInput } from "@/components/ui/input";
import colors, { COLORS } from "@/constants/colors";
import { Calendar } from "lucide-react-native";
import { useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
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

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        if (onChangeDate) onChangeDate(date);
        hideDatePicker();
    };

    return (
        <>
            <Pressable
                onPress={() => {
                    setDatePickerVisibility(true);
                }}
                pointerEvents="box-only"
                style={{
                    width: "100%",
                    position: "relative",
                }}
            >
                <RNInput
                    label={label}
                    value={value ? value.toDateString() : ""}
                    editable={false}
                    key={value?.toDateString()}
                    pointerEvents="none"
                    error={error}
                />
                <Calendar
                  color={colors.dark.textSecondary}
                  style={{
                        position: "absolute",
                        right: 8,
                        top: 14,
                        padding: 4,
                    }} />
            </Pressable>

            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                modalStyleIOS={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                date={value ?? new Date()}
                pickerContainerStyleIOS={{
                    backgroundColor: COLORS.background,
                    borderRadius: 20,
                    width: 500,
                }}
                pickerStyleIOS={{
                    width: "100%",
                    paddingHorizontal: 85,
                }}
                confirmTextIOS="OK"
                cancelTextIOS="Cancel"
                buttonTextColorIOS={COLORS.primary}
                customCancelButtonIOS={() => <TouchableOpacity></TouchableOpacity>}
            />
        </>
    );
}
