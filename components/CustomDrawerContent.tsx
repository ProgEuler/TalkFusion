import Logo from "@/assets/svgs/logo.svg";
import colors from "@/constants/colors";
import { useSignIn } from "@/hooks/use-google-signin";
import { logOut, selectCurrentUser } from "@/store/authSlice";
import { clearAuthData } from "@/utils/storage";
import { LinearGradient } from "expo-linear-gradient";
import { usePathname, useRouter } from "expo-router";
import {
    BarChart3,
    BookOpen,
    Bot,
    Brain,
    Building,
    Calendar,
    CreditCard,
    FileText,
    Grid,
    HelpCircle,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Plug,
    Settings,
    User,
    Users,
    Wallet
} from "lucide-react-native";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ color: string; size: number }>;
  route: string;
}

const userMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/(user_dashboard)/home",
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    icon: Bot,
    route: "/(user_dashboard)/ai-assistant",
  },
  {
    id: "business-topics",
    label: "Business Topics",
    icon: Brain,
    route: "/(user_dashboard)/business-topics",
  },
  {
    id: "knowledge-base",
    label: "Knowledge Base",
    icon: BookOpen,
    route: "/(user_dashboard)/knowledge-base",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Plug,
    route: "/(user_dashboard)/integrations",
  },
  {
    id: "appointments",
    label: "Agenda",
    icon: Calendar,
    route: "/(user_dashboard)/appointments",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    route: "/(user_dashboard)/analytics",
  },
  {
    id: "chat-history",
    label: "Chat History",
    icon: MessageSquare,
    route: "/(user_dashboard)/chat-history",
  },
  {
    id: "support",
    label: "Support",
    icon: HelpCircle,
    route: "/(user_dashboard)/support",
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    route: "/(user_dashboard)/team",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    route: "/(user_dashboard)/settings",
  },
];

const adminMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Grid,
    route: "/(admin_dashboard)/home",
  },
  {
    id: "users",
    label: "Users",
    icon: User,
    route: "/(admin_dashboard)/users",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Plug,
    route: "/(admin_dashboard)/integrations",
  },
  {
    id: "company-profile",
    label: "Companies",
    icon: Building,
    route: "/(admin_dashboard)/company-profile",
  },
  {
    id: "performance",
    label: "Analytics",
    icon: BarChart3,
    route: "/(admin_dashboard)/performance",
  },
  {
    id: "subscription",
    label: "Subscription",
    icon: CreditCard,
    route: "/(admin_dashboard)/subscription",
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    route: "/(admin_dashboard)/team",
  },
  {
    id: "overview",
    label: "Overview",
    icon: FileText,
    route: "/(admin_dashboard)/overview",
  },
//   {
//     id: "payment",
//     label: "Payment & Report",
//     icon: Wallet,
//     route: "/(admin_dashboard)/payment",
//   },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    route: "/(admin_dashboard)/settings",
  },
];

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signIn, name } = useSignIn();
  const pathname = usePathname();
  const user = useSelector(selectCurrentUser);
  const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const handleLogout = async () => {
    signIn("signout")
    dispatch(logOut());
    await clearAuthData();
    router.replace("/(auth)/login");
  };

    const isRouteActive = (route: string) => {
        // Exact match
        if (pathname === route) return true;

        // Check if pathname matches the route without the group
        // e.g. route = "/(admin_dashboard)/users", pathname = "/users"
        const routeWithoutGroup = route.replace(/\/\([^)]+\)/, "");
        if (pathname === routeWithoutGroup) return true;

        // Check for sub-routes
        if (pathname.startsWith(route + "/")) return true;
        if (pathname.startsWith(routeWithoutGroup + "/")) return true;

        return false;
    };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Logo width={32} height={32} />
          </View>
          <Text style={styles.logoText}>Verse AI</Text>
        </View>
      </View>

      <ScrollView
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(item.route);

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => handleNavigation(item.route)}
              >
                <Icon
                  color={
                    isActive ? 'white' : colors.dark.textSecondary
                  }
                  size={20}
                />
                <Text
                  style={[styles.menuText, isActive && styles.menuTextActive]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout}>
          <LinearGradient
            colors={[colors.dark.gradientStart, colors.dark.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutButton}
          >
            <LogOut color={colors.dark.text} size={20} />
            <Text style={styles.logoutText}>LOGOUT</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    flex: 1,
    backgroundColor: colors.dark.sidebarBackground,
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: colors.dark.text,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  section: {
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600" as const,
    //  color: colors.dark.textSecondary,
    color: "white",
    textTransform: "uppercase" as const,
    marginBottom: 8,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: colors.dark.primary,
  },
  menuText: {
    fontSize: 15,
    color: colors.dark.textSecondary,
    fontWeight: "500" as const,
  },
  menuTextActive: {
    color: colors.dark.text,
    fontWeight: "600" as const,
  },
  divider: {
    height: 1,
    backgroundColor: colors.dark.border,
    marginVertical: 16,
    marginHorizontal: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: colors.dark.text,
    letterSpacing: 0.5,
  },
});
