import CustomDrawerContent from "@/components/CustomDrawerContent";
import colors from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import {
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Calendar,
  Grid,
  HelpCircle,
  Menu,
  MessageCircle,
  Plug,
  Settings,
  Users,
} from "lucide-react-native";
import React from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";

export default function DashboardLayout() {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={({ navigation }) => ({
        drawerType: "slide",
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.dark.cardBackground,
        },
        headerTintColor: colors.dark.text,
        drawerStyle: {
          backgroundColor: colors.dark.sidebarBackground,
          width: 248,
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
        ),
      })}
    >
      <Drawer.Screen
        name="home/index"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
          drawerIcon: ({ color, size }) => <Grid color={color} size={size} />,
        }}
      />

      <Drawer.Screen
        name="appointments"
        options={{
          drawerLabel: "Appointments",
          title: "Appointments",
          drawerIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="chat-history"
        options={{
          drawerLabel: "Chat History",
          title: "Chat History",
          drawerIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="ai-assistant"
        options={{
          drawerLabel: "AI Assistant",
          title: "AI Assistant",
          drawerIcon: ({ color, size }) => <Bot color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="business-topics"
        options={{
          drawerLabel: "Business Topics",
          title: "Business Topics",
          drawerIcon: ({ color, size }) => <Brain color={color} size={size} />,
        }}
      />

      <Drawer.Screen
        name="analytics"
        options={{
          drawerLabel: "Analytics",
          title: "Analytics",
          drawerIcon: ({ color, size }) => (
            <BarChart3 color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="subscription"
        options={{
          drawerLabel: "Subscription",
          title: "Subscription",
          drawerIcon: ({ color, size }) => <Grid color={color} size={size} />,
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
        name="team"
        options={{
          drawerLabel: "Team",
          title: "Team",
          drawerIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />

      <Drawer.Screen
        name="knowledge-base"
        options={{
          drawerLabel: "Knowledge Base",
          title: "Knowledge Base",
          drawerIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="test-chat"
        options={{
          drawerLabel: "Test Chat",
          title: "Test Chat",
          drawerIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="support"
        options={{
          drawerLabel: "Support",
          title: "Support",
          drawerIcon: ({ color, size }) => (
            <HelpCircle color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="chat-detail"
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
