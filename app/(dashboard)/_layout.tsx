import CustomDrawerContent from "@/components/CustomDrawerContent";
import colors from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import { Menu } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";

export default function DashboardLayout() {
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;

    return (
        <Drawer
            drawerContent={(props: any) => <CustomDrawerContent {...props} />}
            screenOptions={({ navigation}) => ({
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.dark.cardBackground,
                },
                headerTintColor: colors.dark.text,
                drawerStyle: {
                    backgroundColor: colors.dark.sidebarBackground,
                    width: isLargeScreen ? 280 : 280,
                },
                overlayColor: "rgba(0,0,0,0.5)",
                drawerType: isLargeScreen ? "permanent" : "front",
                gestureEnabled: true,
                  swipeEdgeWidth: 50,
                  headerLeft: () => (
                     <TouchableOpacity
                         onPress={() => navigation.toggleDrawer()}
                         style={{ marginLeft: 16 }}
                     >
                        <View style={{ padding: 8, borderRadius: 8, borderColor: "red"}}>
                         <Menu color={colors.dark.primary} size={24} />
                        </View>
                     </TouchableOpacity>
                  )
            })}
        >
            <Drawer.Screen
                name="home"
                options={{
                    drawerLabel: "Dashboard",
                    title: "Dashboard",
                }}
            />
            <Drawer.Screen
                name="ai-assistant"
                options={{
                    drawerLabel: "AI Assistant",
                    title: "AI Assistant",
                }}
            />
            <Drawer.Screen
                name="knowledge-base"
                options={{
                    drawerLabel: "Knowledge Base",
                    title: "Knowledge Base",
                }}
            />
            <Drawer.Screen
                name="integrations"
                options={{
                    drawerLabel: "Integrations",
                    title: "Integrations",
                }}
            />
            <Drawer.Screen
                name="appointments"
                options={{
                    drawerLabel: "Appointments",
                    title: "Agenda Calendar",
                }}
            />
            <Drawer.Screen
                name="add-appointment"
                options={{
                    drawerLabel: "Add Appointment",
                    title: "Add Appointments",
                    drawerItemStyle: { display: "none" },
                }}
            />
            <Drawer.Screen
                name="analytics"
                options={{
                    drawerLabel: "Analytics",
                    title: "Business Analytics",
                }}
            />
            <Drawer.Screen
                name="chat-history"
                options={{
                    drawerLabel: "Chat History",
                    title: "Chat History",
                }}
            />
            <Drawer.Screen
                name="chat-detail"
                options={{
                    drawerLabel: "Chat Detail",
                    title: "",
                    drawerItemStyle: { display: "none" },
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="support"
                options={{
                    drawerLabel: "Support",
                    title: "Support",
                }}
            />
            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: "Settings",
                    title: "Settings",
                }}
            />
        </Drawer>
    );
}
