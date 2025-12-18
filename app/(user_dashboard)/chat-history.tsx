import Facebook from "@/assets/svgs/facebook.svg";
import WhatsApp from "@/assets/svgs/whatsapp.svg";
import { Layout } from "@/components/layout/Layout";
import colors from "@/constants/colors";
import { selectCurrentToken } from "@/store/authSlice";
import {
    addMessage,
    selectAllRooms,
    setRooms,
    updateRoomLastMessage
} from "@/store/chat.slice";
import {
    ChevronDown,
    Instagram,
    MessageCircle,
    Search,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./chat/chat-list";

// export interface ChatMessage {
//   id: string;
//   name: string;
//   lastMessage: string;
//   timestamp: string;
//   profilePicture?: string;
//   isOnline?: boolean;
//   isStarred?: boolean;
//   isSelected?: boolean;
//   unreadCount?: number;
//   isRead?: boolean;
//   channel: "facebook" | "whatsapp" | "instagram" | "chat";
// }

export default function ChatHistoryScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedChannel, setSelectedChannel] = useState<
    "all" | "facebook" | "whatsapp" | "instagram" | "chat"
  >("all");

  const dispatch = useDispatch();
  const allRooms = useSelector(selectAllRooms);
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://ape-in-eft.ngrok-free.app/ws/chat/?token=${token}`
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // console.log("WebSocket message:", data);

      if (data.type === "connection_established") {
        // Initial connection - set profiles and rooms
        // Combine all rooms from all profiles
const combinedRooms = data.profiles.flatMap((profile: any) =>
  profile.room.map((room: any) => ({
    room_id: room.room_id.toString(),           // Ensure string
    client_id: room.client_id,
    lastMessage: room.last_msg || "No messages yet",
    last_msg: room.last_msg || "No messages yet",  // Keep both if needed
    timestamp: room.timestamp,
    message_type: room.type,                    // "outgoing" or "incoming"
    channel: profile.platform as "facebook" | "whatsapp" | "instagram" | "chat",
    profile_name: profile.profile_name,
    profile_id: profile.profile_id,
    unreadCount: room.unread_count ?? 0,         // Use actual unread if available later
    isRead: (room.unread_count ?? 0) === 0,
  }))
);
        dispatch(setRooms(combinedRooms));
      } else if (data.type === "new_message") {
        // Handle new message - update the relevant room
        dispatch(
          updateRoomLastMessage({
            roomId: data.room_id,
            message: data.message,
            timestamp: data.timestamp,
            messageType: data.message_type,
          })
        );

        // Also add to messages store for live chat detail view
        dispatch(
            addMessage({
                roomId: data.room_id,
                message: {
                    id: Date.now().toString(), // Generating ID as it's missing from event payload in this context
                    text: data.message,
                    timestamp: data.timestamp,
                    isSent: data.message_type === "outgoing",
                    isRead: false,
                    type: data.message_type === "outgoing" ? "outgoing" : "incoming"
                }
            })
        );
      }
    };

    socket.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, [token]);

  // Filter rooms based on search query and selected channel
  const filteredRooms = allRooms.filter((room) => {
    const matchesSearch =
      room.client_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesChannel =
      selectedChannel === "all" || room.channel === selectedChannel;

    return matchesSearch && matchesChannel;
  });

  // Sort rooms
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    // Prioritize unread messages
    // Check if room has unread messages (unreadCount > 0 or isRead explicitly false)
    const aIsUnread = (a.unreadCount && a.unreadCount > 0) || a.isRead === false;
    const bIsUnread = (b.unreadCount && b.unreadCount > 0) || b.isRead === false;

    if (aIsUnread && !bIsUnread) return -1;
    if (!aIsUnread && bIsUnread) return 1;

    // Then sort by timestamp if active sort is "Newest"
    if (sortBy === "Newest") {
      return (
        new Date(b.timestamp || 0).getTime() -
        new Date(a.timestamp || 0).getTime()
      );
    }
    // Add other sorting options as needed
    return 0;
  });

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Channel Icons */}
      <View style={styles.channelIconsContainer}>
        {/* all */}
        <TouchableOpacity
          style={[
            styles.channelIcon,
            selectedChannel === "all" && styles.channelIconActive,
          ]}
          onPress={() => setSelectedChannel("all")}
        >
          <MessageCircle
            size={24}
            color={
              selectedChannel === "all"
                ? colors.dark.text
                : colors.dark.textSecondary
            }
          />
        </TouchableOpacity>
        {/* facebook */}
        <TouchableOpacity
          style={[
            styles.channelIcon,
            selectedChannel === "facebook" && styles.channelIconActive,
          ]}
          onPress={() => setSelectedChannel("facebook")}
        >
          <Facebook
            width={24}
            height={24}
            color={
              selectedChannel === "facebook"
                ? colors.dark.text
                : colors.dark.textSecondary
            }
          />
        </TouchableOpacity>
        {/* whatsapp */}
        <TouchableOpacity
          style={[
            styles.channelIcon,
            selectedChannel === "whatsapp" && styles.channelIconActive,
          ]}
          onPress={() => setSelectedChannel("whatsapp")}
        >
          <WhatsApp
            width={24}
            height={24}
            color={
              selectedChannel === "whatsapp"
                ? colors.dark.text
                : colors.dark.textSecondary
            }
          />
        </TouchableOpacity>
        {/* instagram */}
        <TouchableOpacity
          style={[
            styles.channelIcon,
            selectedChannel === "instagram" && styles.channelIconActive,
          ]}
          onPress={() => setSelectedChannel("instagram")}
        >
          <Instagram
            size={24}
            color={
              selectedChannel === "instagram"
                ? colors.dark.text
                : colors.dark.textSecondary
            }
          />
        </TouchableOpacity>
      </View>
      <Layout>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search
            color={colors.dark.textSecondary}
            size={20}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.dark.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Sort Option */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by</Text>
          <TouchableOpacity style={styles.sortDropdown}>
            <Text style={styles.sortValue}>{sortBy}</Text>
            <ChevronDown color={colors.dark.textSecondary} size={20} />
          </TouchableOpacity>
        </View>

        {/* Chat List */}
        <ChatList rooms={sortedRooms} messages={[]} />
      </Layout>
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
});
