import colors, { COLORS } from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import {
    LayoutChangeEvent,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type Props = {
    label?: string;
    prefix?: string;
    marginTop?: number;
    style?: ViewProps["style"];
    inputStyle?: TextInputProps["style"];
    error?: boolean;
} & TextInputProps;

export function RNInput({
    style,
    inputStyle,
    prefix,
    label,
    placeholder,
    marginTop = 0,
    error,
    ...props
}: Props) {

    const [showPassword, setShowPassword] = useState(
        props.secureTextEntry || false,
    );

    const [value, setValue] = useState(props.value || "");
    const [inputHeight, setInputHeight] = useState(0);

    const onChangeText = (text: string) => {
        setValue(text);
        if (props.onChangeText) {
            props.onChangeText(text);
        }
    };

    useEffect(() => {
        if (props.value !== undefined) {
            setValue(props.value);
            labelPosition.value = props.value ? 1 : 0;
        }
    }, [props.value]);

    const labelPosition = useSharedValue(value ? 1 : 0);

    const animatedLabelStyle = useAnimatedStyle(() => {
        const translateY = labelPosition.value === 1 ? -10 : 12;
        const translateX = labelPosition.value === 1 ? 8 : 6;
        const fontSize = labelPosition.value === 1 ? 12 : 16;
        const color = error ? colors.dark.danger : colors.dark.textSecondary;

        return {
            transform: [
                { translateY: withTiming(translateY, { duration: 200 }) },
                { translateX: withTiming(translateX, { duration: 200 }) },
            ],
            fontSize,
            color,
        };
    });

    const handleInputLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setInputHeight(height);
    };

    const eyeIconTopOffset = inputHeight > 0 ? inputHeight / 2 : "50%";

    return (
        <View
            style={[{ marginTop, padding: 1, position: "relative" }, style]}
            pointerEvents="box-none"
        >
            {label && (
                <Animated.Text
                    pointerEvents={"none"}
                    style={[
                        {
                            position: "absolute",
                            zIndex: 10,
                            paddingHorizontal: 8,
                        },
                        animatedLabelStyle,
                    ]}
                >

                    {label}
                </Animated.Text>
            )}

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: error ? colors.dark.danger : colors.dark.border,
                    borderRadius: 8,
                    paddingRight: props.secureTextEntry ? 32 : 0,
                }}
            >
                <TextInput
                    {...props}
                    value={value}
                    onChangeText={onChangeText}
                    onLayout={handleInputLayout}
                    placeholderTextColor={COLORS.muted}
                    secureTextEntry={showPassword}
                    autoComplete={props.secureTextEntry ? "off" : props.autoComplete}
                    autoCapitalize={props.secureTextEntry ? "none" : props.autoCapitalize}
                    style={[
                        {
                            flex: 1,
                            borderColor: colors.dark.border,
                            color: colors.dark.text,
                            padding: 12,
                            borderRadius: 8,
                            fontSize: 16,
                            backgroundColor: colors.dark.cardBackground,
                        },
                        inputStyle
                    ]}
                />
                {props.secureTextEntry && (
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 16,
                            top: eyeIconTopOffset,
                            transform: [{ translateY: -9 }],
                        }}
                        onPress={() => setShowPassword((prev) => !prev)}
                        activeOpacity={0.7}
                    >
                        <Entypo
                            name={!showPassword ? "eye-with-line" : "eye"}
                            size={18}
                            color={COLORS.muted}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
