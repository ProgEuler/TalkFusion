import { RNInput } from "@/components/ui/input";
import colors from "@/constants/colors";
import { Calendar, Clock } from "lucide-react-native";
import { useState } from "react";
import { Pressable } from "react-native";
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
                    value={
                        value
                        ? mode === 'time'
                            ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : mode === 'datetime'
                                ? value.toLocaleString()
                                : value.toDateString()
                        : ""
                    }
                    editable={false}
                    key={value?.toString()}
                    pointerEvents="none"
                    error={error}
                />
                {
                  mode === "date"
                  ? <Calendar
                    color={colors.dark.textSecondary}
                    style={{
                          position: "absolute",
                          right: 8,
                          top: 14,
                          padding: 4,
                      }} />
                  : <Clock
                      color={colors.dark.textSecondary}
                        style={{
                              position: "absolute",
                              right: 8,
                              top: 14,
                              padding: 4,
                           }}
                     />
                }
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
                    backgroundColor: colors.dark.cardBackground,
                    borderRadius: 20,
                }}
                pickerStyleIOS={{
                    width: "100%",
                }}
                confirmTextIOS="OK"
                cancelTextIOS="Cancel"
                buttonTextColorIOS={colors.dark.primary}
            />
        </>
    );
}
