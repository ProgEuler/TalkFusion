import Insta from "@/assets/svgs//instagram.svg";
import Fb from "@/assets/svgs/facebook.svg";
import Wp from "@/assets/svgs/whatsapp.svg";
import colors from "@/constants/colors";
import { Room } from "@/store/chat.slice";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ChatListProps {
  rooms: Room[];
  messages: any[]; // Or proper type if available
}

export default function ChatList({ rooms }: ChatListProps) {
  const router = useRouter();

  const handleChatSelect = (chatId: string) => {
    router.push({
      pathname: "/(user_dashboard)/chat-detail",
      params: { chatId },
    });
  };

  return (
    <View style={styles.chatList}>
      <FlashList
        data={rooms}
        renderItem={({ item: chat }) => (
          <TouchableOpacity
            key={chat.room_id}
            style={styles.chatItem}
            onPress={() => handleChatSelect(chat.room_id.toString())}
            activeOpacity={0.7}
          >
            {/* Profile Picture */}
            <View style={styles.profilePictureContainer}>
              <View
                style={[
                  styles.profilePicture,
                  {
                    backgroundColor:
                      (chat.channel === "facebook"
                        ? "#1877F2"
                        : chat.channel === "whatsapp"
                        ? "#25D366"
                        : chat.channel === "instagram"
                        ? "#E4405F"
                        : colors.dark.primary) + "40",
                  },
                ]}
              >
               {
                  chat.channel === "facebook"
                          ? <Fb color={"#fff"} />
                          : chat.channel === "whatsapp"
                          ? <Wp color={"#fff"}  />
                          : chat.channel === "instagram"
                          ? <Insta color={"#fff"}  />
                          : colors.dark.primary
               }
              </View>
            </View>

            {/* Chat Content */}
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <View style={styles.nameContainer}>
                  <Text style={styles.chatName}>{chat.client_id}</Text>
                  {/* Channel indicator badge */}
                  <View
                    style={[
                      styles.channelBadge,
                      {
                        backgroundColor:
                          chat.channel === "facebook"
                            ? "#1877F2"
                            : chat.channel === "whatsapp"
                            ? "#25D366"
                            : chat.channel === "instagram"
                            ? "#E4405F"
                            : colors.dark.primary,
                      },
                    ]}
                  >
                    <Text style={styles.channelBadgeText}>
                      {chat.channel?.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                </View>
                {chat.timestamp && (
                  <Text style={styles.timestamp}>
                    {new Date(chat.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                )}
              </View>
              <View style={styles.messageContainer}>
                <Text
                  style={[
                    styles.lastMessage,
                    chat.message_type === "outgoing" && styles.lastMessageSent,
                  ]}
                  numberOfLines={2}
                >
                  {chat.message_type === "outgoing" ? "You: " : ""}
                  {chat.lastMessage || "No messages yet"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        estimatedItemSize={80}
        keyExtractor={(item) => item.room_id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  channelIconsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  channelIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.dark.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  channelIconActive: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primary,
  },
  chatIconContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: -6,
    width: 24,
    height: 24,
    justifyContent: "center",
  },
  chatBubble: {
    width: 14,
    height: 14,
    borderRadius: 7,
    opacity: 0.8,
  },
  chatBubbleOverlay: {
    marginLeft: -8,
    marginBottom: -2,
    opacity: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.dark.text,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.dark.text,
    padding: 0,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: "500",
  },
  sortDropdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sortValue: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: "500",
  },
  chatList: {
    gap: 0,
  },
  chatItem: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: "transparent",
  },
  profilePictureContainer: {
    position: "relative",
    marginRight: 12,
  },
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  profilePictureInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePictureText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.dark.success,
    borderWidth: 2,
    borderColor: colors.dark.background,
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark.text,
  },
  starIcon: {
    marginLeft: 4,
  },
  timestamp: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lastMessage: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  lastMessageSent: {
    fontStyle: "italic",
  },
  readIcon: {
    marginLeft: 4,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.dark.text,
  },
  channelBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  channelBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
});
