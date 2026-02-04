import { useGetNotificationsQuery } from "@/api/user-api/dashboard.api";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { AlertCircle, Bell, CheckCircle, Clock, MoreVertical, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type NotificationType = 'error' | 'warning' | 'success' | 'info';

interface Notification {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  type: NotificationType;
  is_read: boolean;
}

export default function NotificationsScreen() {
  const { data, error, isLoading, refetch, isFetching } = useGetNotificationsQuery(undefined);
  const [filter, setFilter] = useState<'all' | 'unread' | NotificationType>('all');
  
  const notifications: Notification[] = data || [];
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.is_read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'error':
        return <XCircle color={colors.dark.danger} size={24} />;
      case 'warning':
        return <AlertCircle color={colors.dark.warning} size={24} />;
      case 'success':
        return <CheckCircle color={colors.dark.success} size={24} />;
      default:
        return <Bell color={colors.dark.primary} size={24} />;
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
      if (diffInDays < 7) {
        return `${diffInDays}d ago`;
      } else {
        return date.toLocaleDateString();
      }
    }
  };

  const handleNotificationPress = (notification: Notification) => {
    // Handle notification press - mark as read, navigate, etc.
    console.log('Notification pressed:', notification);
  };

  const handleMarkAllAsRead = () => {
    // Implement mark all as read functionality
    console.log('Mark all as read');
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.is_read && styles.unreadNotification
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationIcon}>
        {getNotificationIcon(item.type)}
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={[
          styles.notificationTitle,
          !item.is_read && styles.unreadText
        ]}>
          {item.title}
        </Text>
        <Text style={styles.notificationSubtitle}>
          {item.subtitle}
        </Text>
        <View style={styles.notificationFooter}>
          <Clock color={colors.dark.textSecondary} size={14} />
          <Text style={styles.notificationTime}>
            {formatTime(item.time)}
          </Text>
        </View>
      </View>
      
      <View style={styles.notificationActions}>
        {!item.is_read && (
          <View style={[
            styles.unreadDot,
            { backgroundColor: getNotificationColor(item.type) }
          ]} />
        )}
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical color={colors.dark.textSecondary} size={16} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Bell color={colors.dark.textSecondary} size={64} />
      <Text style={styles.emptyTitle}>No notifications</Text>
      <Text style={styles.emptySubtitle}>
        {filter === 'unread' 
          ? "You have no unread notifications"
          : "You're all caught up! No notifications to show."
        }
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={handleMarkAllAsRead}>
            <Text style={styles.markAllReadText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.filterContainer}>
        {['all', 'unread', 'error', 'warning', 'success'].map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterButton,
              filter === filterType && styles.activeFilterButton
            ]}
            onPress={() => setFilter(filterType as any)}
          >
            <Text style={[
              styles.filterButtonText,
              filter === filterType && styles.activeFilterButtonText
            ]}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <View style={styles.errorContainer}>
          <XCircle color={colors.dark.danger} size={64} />
          <Text style={styles.errorTitle}>Failed to load notifications</Text>
          <Text style={styles.errorSubtitle}>
            Please check your connection and try again
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor={colors.dark.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: colors.dark.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: "500",
  },
  listContainer: {
    flexGrow: 1,
  },
  header: {
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.dark.text,
  },
  markAllReadText: {
    fontSize: 14,
    color: colors.dark.primary,
    fontWeight: "500",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.dark.cardBackground,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  activeFilterButton: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: "500",
  },
  activeFilterButtonText: {
    color: colors.dark.text,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors.dark.cardBackground,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  unreadNotification: {
    backgroundColor: colors.dark.primary + "05",
    borderColor: colors.dark.primary + "20",
  },
  notificationIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.dark.text,
    marginBottom: 6,
  },
  unreadText: {
    fontWeight: "600",
  },
  notificationSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationTime: {
    fontSize: 13,
    color: colors.dark.textSecondary,
    marginLeft: 6,
  },
  notificationActions: {
    alignItems: "center",
    marginLeft: 12,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  moreButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: "center",
  },
});