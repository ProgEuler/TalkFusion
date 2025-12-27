import colors from "@/constants/colors";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

type Variant =
  | "small"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "destructive_outline"
  | "big"
  | "profile_menu";

type Size = "sm" | "lg" | "xl";

type Props = TouchableOpacityProps & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  isLoading?: boolean;
  noWrap?: boolean;
};

const COLORS = {
  primary: "#2563EB",
  mutedBackground: "#1F2937",
  foreground: "#111827",
  red: "#EF4444",
  white: "#FFFFFF",
};

const variantStyles: Record<Variant, ViewStyle> = {
  small: {
    marginLeft: "auto",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.dark.primary,
  },
  primary: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  secondary: {
    backgroundColor: COLORS.mutedBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  outline: {
    borderWidth: 1,
    borderColor: "#3A3A3C",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  ghost: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  destructive: {
    backgroundColor: COLORS.red,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  destructive_outline: {
    borderWidth: 1,
    borderColor: COLORS.red,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  big: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "100%",
  },
  profile_menu: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.mutedBackground,
    borderRadius: 12,
  },
};

const textStyles: Record<Variant, TextStyle> = {
  small: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: "center",
  },
  primary: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  secondary: { color: COLORS.white, fontWeight: "500", textAlign: "center" },
  outline: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "400" as const,
    textAlign: "center",
  },
  ghost: { color: COLORS.foreground, fontWeight: "600", textAlign: "center" },
  destructive: { color: COLORS.white, fontWeight: "600", textAlign: "center" },
  destructive_outline: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: "500" as const,
    textAlign: "center",
  },
  big: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  profile_menu: {},
};

const spinnerColors: Record<Variant, string> = {
  small: COLORS.white,
  primary: COLORS.white,
  secondary: COLORS.white,
  outline: COLORS.primary,
  ghost: COLORS.foreground,
  destructive: COLORS.white,
  destructive_outline: COLORS.red,
  big: COLORS.white,
  profile_menu: COLORS.primary,
};

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { minWidth: 24 },
  lg: {
    height: 48,
    minWidth: 140,
  },
  xl: {
    height: 56,
    minWidth: 180,
  },
};

export const Button = ({
  children,
  variant = "primary",
  size = "lg",
  noWrap = false,
  isLoading = false,
  ...props
}: Props) => {
  const buttonStyle = [
    variantStyles[variant],
    sizeStyles[size],
    {
      opacity: isLoading || props.disabled ? 0.5 : 1,
      justifyContent: "center" as ViewStyle["justifyContent"],
      alignItems: "center" as ViewStyle["alignItems"],
    },
    props.style,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading || props.disabled}
      {...props}
      style={buttonStyle}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={spinnerColors[variant]} />
          {!noWrap && <Text style={textStyles[variant]}>Loading...</Text>}
        </View>
      ) : noWrap ? (
        children
      ) : (
        <Text style={textStyles[variant]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
