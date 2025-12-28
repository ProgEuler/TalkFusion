import CustomDrawerContent from "@/components/CustomDrawerContent";
import colors from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import { BarChart3, Building, CreditCard, FileText, Grid, Menu, Plug, User, Users, Wallet } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";

export default function DashboardLayout() {
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;

    return (
        <Drawer
            drawerContent={CustomDrawerContent}
            screenOptions={({ navigation }) => ({
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.dark.cardBackground,
                },
                headerTintColor: colors.dark.text,
                drawerStyle: {
                    backgroundColor: colors.dark.sidebarBackground,
                    width: 280,
                },
                drawerActiveTintColor: colors.dark.primary,
                drawerInactiveTintColor: colors.dark.primary,
                overlayColor: "rgba(0,0,0,0.5)",
                drawerType: isLargeScreen ? "permanent" : "front",
                gestureEnabled: true,
                swipeEdgeWidth: 50,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginLeft: 16 }}
                    >
                        <View style={{ padding: 8, borderRadius: 8 }}>
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
                    drawerIcon: ({ color, size }) => <Grid color={color} size={size} />,
                }}
            />

            <Drawer.Screen
                name="users"
                options={{
                    drawerLabel: "Users",
                    title: "Users",
                    drawerIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />

            <Drawer.Screen
                name="integrations"
                options={{
                    drawerLabel: "Integrations",
                    title: "Integrations",
                    drawerIcon: ({ color, size }) => <Plug color={color} size={size} />,
                }}
            />

            <Drawer.Screen
                name="company-profile"
                options={{
                    drawerLabel: "Companies",
                    title: "Companies",
                    drawerIcon: ({ color, size }) => <Building color={color} size={size} />,
                }}
            />

            <Drawer.Screen
                name="performance"
                options={{
                    drawerLabel: "Performance & Analytics",
                    title: "Performance & Analytics",
                    drawerIcon: ({ color, size }) => <BarChart3 color={color} size={size} />,
                }}
            />

            <Drawer.Screen
                name="subscription"
                options={{
                    drawerLabel: "Subscription Management",
                    title: "Subscription Management",
                    drawerIcon: ({ color, size }) => <CreditCard color={color} size={size} />,
                }}
            />

            <Drawer.Screen
                name="team"
                options={{
                    drawerLabel: "Team",
                    title: "Team",
                    drawerIcon: ({ color, size }) => <Users color={color} size={size} />,
                }}
            />

            <Drawer.Screen
                name="overview"
                options={{
                    drawerLabel: "Overview",
                    title: "Overview",
                    drawerIcon: ({ color, size }) => <FileText color={color} size={size} />,
                }}
            />

            <Drawer.Screen
                name="payment"
                options={{
                    drawerLabel: "Payment & Report",
                    title: "Payment & Report",
                    drawerIcon: ({ color, size }) => <Wallet color={color} size={size} />,
                }}
            />

            <Drawer.Screen
                name="subscription-requests"
                options={{
                    drawerLabel: "Subscription Requests",
                    title: "Subscription Requests",
                    drawerItemStyle: { display: "none" },
                }}
            />
        </Drawer>
    );
}
