import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import colors, { COLORS } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ArrowDown } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RNInput } from "./input";
import { RNText } from "./text";

type Props = {
  label?: string;
  value?: string;
  items: { label: string; value: string }[];
  onSelectItem?: (item: string) => void;
};

const height = Dimensions.get("window").height;
const marginTop = 8;

export function RNPicker({ onSelectItem, label, value, items }: Props) {
  const { bottom } = useSafeAreaInsets();
  const [showPicker, setShowPicker] = useState(false);
  const animationDriver = useSharedValue(0);

  const closeModal = () => {
    animationDriver.value = withTiming(0, { duration: 400 });
    setTimeout(() => setShowPicker(false), 400);
  };

  const modalPosition = useAnimatedStyle(() => {
    const translateY = interpolate(
      animationDriver.value,
      [0, 1],
      [height, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  const backdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationDriver.value,
      [0, 0.5, 1],
      [0, 0.5, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  const onSelectItemHandle = (item: string) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
    closeModal();
  };

  const renderItem = ({
    item,
  }: {
    item: {
      value: string;
      label: string;
    };
  }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onSelectItemHandle(item.value)}
      style={{
        width: "100%",
        paddingVertical: 14,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor:
          value === item.label ? colors.dark.primary + "22" : "transparent",
      }}
    >
      <RNText
        style={{
          color: COLORS.text,
          fontSize: 16,
          fontWeight: value === item.value ? "600" : "400",
          textAlign: "center",
        }}
      >
        {item.label}
      </RNText>
    </TouchableOpacity>
  );

  return (
    <>
      <Pressable
        onPress={() => {
          setShowPicker(true);
          animationDriver.value = withTiming(1, { duration: 400 });
        }}
        style={{
          width: "100%",
          position: "relative",
        }}
        pointerEvents="box-only"
      >
        <RNInput
          pointerEvents="none"
          label={label}
          value={value}
          editable={false}
          marginTop={marginTop}
        />
        <ArrowDown
          style={{
            position: "absolute",
            right: 8,
            top: 20,
            padding: 4,
            zIndex: 99
          }}
          size={22}
          color={colors.dark.border}
        />
      </Pressable>

      <Modal
        animationType="none"
        transparent={true}
        visible={showPicker}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Animated.View
            onStartShouldSetResponder={() => {
              closeModal();
              return false;
            }}
            style={[
              {
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.45)",
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "flex-end",
              },
              backdropStyle,
            ]}
          />

          <Animated.View
            style={[
              {
                backgroundColor: colors.dark.background,
                width: "100%",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                padding: 16,
                maxHeight: height * 0.8,
                zIndex: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 10,
              },
              modalPosition,
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <RNText
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: COLORS.text,
                }}
              >
                {"Select"}
              </RNText>
              <TouchableOpacity onPress={closeModal} activeOpacity={0.7}>
                <AntDesign name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: COLORS.muted,
              }}
            />

            <FlatList
              data={items}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={renderItem}
              style={{ marginTop: 12 }}
              contentContainerStyle={{
                paddingBottom: bottom,
              }}
            //   ItemSeparatorComponent={() => (
            //     <View
            //       style={{
            //         marginHorizontal: "auto",
            //         width: "50%",
            //         height: 1,
            //         backgroundColor: COLORS.muted,
            //         marginVertical: 8,
            //       }}
            //     />
            //   )}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
