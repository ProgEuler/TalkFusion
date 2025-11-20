import colors from "@/constants/colors";
import { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
    SafeAreaView,
    SafeAreaViewProps,
} from "react-native-safe-area-context";

type Props = {
    children?: ReactNode;
    stickyHeaderIndices?: number[];
} & SafeAreaViewProps;

export function Layout({ children, style, ...props }: Props) {
    const padding = 12;

    return (
        <SafeAreaView
            edges={props.edges || []}
            style={{ flex: 1, backgroundColor: colors.dark.background, padding }}
            {...props}
        >
            <KeyboardAwareScrollView
                stickyHeaderIndices={props.stickyHeaderIndices}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardDismissMode="interactive"
                bottomOffset={20}
                contentContainerStyle={[
                    {
                        flexGrow: 1,
                        gap: 8,
                    },
                    style,
                ]}
            >
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
