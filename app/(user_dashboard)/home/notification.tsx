import { useGetNotificationsQuery } from '@/api/user-api/dashboard.api'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import colors from '@/constants/colors'
import { useRouter } from 'expo-router'
import { AlertCircle, Bell, CheckCircle, Clock, XCircle } from 'lucide-react-native'
import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type NotificationType = 'error' | 'warning' | 'success' | 'info';

interface Notification {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  type: NotificationType;
  is_read: boolean;
}

export default function Notifications() {
  const { data, error, isLoading, refetch, isFetching } = useGetNotificationsQuery(undefined);
  const router = useRouter();

  const notifications: Notification[] = data || [];
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'error':
        return <XCircle color={colors.dark.danger} size={20} />;
      case 'warning':
        return <AlertCircle color={colors.dark.warning} size={20} />;
      case 'success':
        return <CheckCircle color={colors.dark.success} size={20} />;
      default:
        return <Bell color={colors.dark.primary} size={20} />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'error':
        return colors.dark.danger;
      case 'warning':
        return colors.dark.warning;
      case 'success':
        return colors.dark.success;
      default:
        return colors.dark.primary;
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Notifications/Alerts</Text>
        </View>
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Notifications/Alerts</Text>
          <Text style={[styles.cardBadge, { backgroundColor: colors.dark.danger + "20", color: colors.dark.danger }]}>
            Error
          </Text>
        </View>
        <View style={styles.alertContainer}>
          <XCircle color={colors.dark.danger} size={48} />
          <Text style={styles.alertTitle}>Failed to load notifications</Text>
          <Text style={styles.alertSubtitle}>
            Please check your connection and try again
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Notifications/Alerts</Text>
          <Text style={[styles.cardBadge, { backgroundColor: colors.dark.success + "20" }]}>
            All clear
          </Text>
        </View>
        <View style={styles.alertContainer}>
          <CheckCircle color={colors.dark.success} size={48} />
          <Text style={styles.alertTitle}>No notifications</Text>
          <Text style={styles.alertSubtitle}>
            You're all caught up! No new alerts or notifications.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Notifications/Alerts</Text>
        {unreadCount > 0 && (
          <Text style={[styles.cardBadge, { backgroundColor: colors.dark.danger + "20", color: colors.dark.danger }]}>
            {unreadCount} unread
          </Text>
        )}
      </View>

      <ScrollView
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor={colors.dark.primary}
          />
        }
      >
        {notifications.slice(0, 5).map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.is_read && styles.unreadNotification
            ]}
            // onPress={() => handleNotificationPress(notification)}
          >
            <View style={styles.notificationIcon}>
              {getNotificationIcon(notification.type)}
            </View>

            <View style={styles.notificationContent}>
              <Text style={[
                styles.notificationTitle,
                !notification.is_read && styles.unreadText
              ]}>
                {notification.title}
              </Text>
              <Text style={styles.notificationSubtitle}>
                {notification.subtitle}
              </Text>
              <View style={styles.notificationFooter}>
                <Clock color={colors.dark.textSecondary} size={12} />
                <Text style={styles.notificationTime}>
                  {formatTime(notification.time)}
                </Text>
              </View>
            </View>

            {!notification.is_read && (
              <View style={[
                styles.unreadDot,
                { backgroundColor: getNotificationColor(notification.type) }
              ]} />
            )}
          </TouchableOpacity>
        ))}

        {/* {notifications.length > 5 && (
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => router.push('/(user_dashboard)/notifications')}
          >
            <Text style={styles.viewAllText}>
              View all {notifications.length} notifications
            </Text>
          </TouchableOpacity>
        )} */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
    backgroundColor: colors.dark.cardBackground,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.dark.text,
  },
  cardBadge: {
    fontSize: 12,
    color: colors.dark.success,
    backgroundColor: colors.dark.success + "20",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "600" as const,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  loadingText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: 12,
  },
  alertContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  alertTitle: {
    fontSize: 16,
    color: colors.dark.text,
    fontWeight: "600" as const,
    marginTop: 12,
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.dark.text,
    fontSize: 14,
    fontWeight: "500",
  },
  notificationsList: {
    maxHeight: 300,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: colors.dark.background,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  unreadNotification: {
    backgroundColor: colors.dark.primary + "05",
    borderColor: colors.dark.primary + "20",
  },
  notificationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark.text,
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: "600",
  },
  notificationSubtitle: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationTime: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    marginLeft: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 6,
  },
  viewAllButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.dark.primary,
    fontWeight: "500",
  },
});
