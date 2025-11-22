import Facebook from "@/assets/svgs/facebook.svg";
import WhatsApp from "@/assets/svgs/whatsapp.svg";
import { Layout } from "@/components/layout/Layout";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import {
    Check,
    ChevronDown,
    Instagram,
    MessageCircle,
    Search,
    Star,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ChatMessage {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    profilePicture?: string;
    isOnline?: boolean;
    isStarred?: boolean;
    isSelected?: boolean;
    unreadCount?: number;
    isRead?: boolean;
    channel: "facebook" | "whatsapp" | "instagram" | "chat";
}

const mockChats: ChatMessage[] = [
    {
        id: "1",
        name: "John Doe",
        lastMessage: "How are you doing?",
        timestamp: "16:45",
        isOnline: true,
        isStarred: true,
        isRead: true,
        channel: "whatsapp",
    },
    {
        id: "2",
        name: "Travis Barker",
        lastMessage: "you: See you tomorrow!",
        timestamp: "16:45",
        isOnline: false,
        isSelected: true,
        unreadCount: 1,
        isRead: false,
        channel: "facebook",
    },
    {
        id: "3",
        name: "Kate Rose",
        lastMessage: "Thank you so much! 😊",
        timestamp: "16:45",
        isOnline: true,
        isRead: true,
        channel: "instagram",
    },
    {
        id: "4",
        name: "Robert Parker",
        lastMessage: "I'll be there in 10 minutes",
        timestamp: "16:45",
        isOnline: false,
        unreadCount: 2,
        isRead: false,
        channel: "chat",
    },
    {
        id: "5",
        name: "Sarah Johnson",
        lastMessage: "Can we reschedule?",
        timestamp: "16:45",
        isOnline: true,
        isRead: true,
        channel: "whatsapp",
    },
    {
        id: "6",
        name: "Mike Wilson",
        lastMessage: "Great! Looking forward to it",
        timestamp: "16:45",
        isOnline: false,
        isRead: true,
        channel: "facebook",
    },
];

const channelIcons = {
    facebook: Facebook,
    whatsapp: WhatsApp,
    instagram: MessageCircle, // Using MessageCircle as placeholder for Instagram
    chat: MessageCircle,
};

const channelColors = {
    facebook: "#1877F2",
    whatsapp: "#25D366",
    instagram: "#E4405F",
    chat: colors.dark.primary,
};

export default function ChatHistoryScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Newest");
    const [selectedChannel, setSelectedChannel] = useState<
        "all" | "facebook" | "whatsapp" | "instagram" | "chat"
    >("all");
    const [chats, setChats] = useState<ChatMessage[]>(mockChats);

    const filteredChats = chats.filter((chat) => {
        const matchesSearch =
            chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesChannel =
            selectedChannel === "all" || chat.channel === selectedChannel;
        return matchesSearch && matchesChannel;
    });

    const handleChatSelect = (chatId: string) => {
        // Navigate to chat detail screen
        router.push({
            pathname: "/(user_dashboard)/chat-detail",
            params: { chatId },
        });
    };

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
                        selectedChannel === "facebook" &&
                            styles.channelIconActive,
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
                        selectedChannel === "whatsapp" &&
                            styles.channelIconActive,
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
                        selectedChannel === "instagram" &&
                            styles.channelIconActive,
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
                <Text style={styles.pageTitle}>Messages History</Text>

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
                        <ChevronDown
                            color={colors.dark.textSecondary}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                {/* Chat List */}
                <View style={styles.chatList}>
                    {filteredChats.map((chat) => {
                        const ChannelIcon = channelIcons[chat.channel];
                        const channelColor = channelColors[chat.channel];

                        return (
                            <TouchableOpacity
                                key={chat.id}
                                style={styles.chatItem}
                                onPress={() => handleChatSelect(chat.id)}
                                activeOpacity={0.7}
                            >
                                {/* Profile Picture */}
                                <View style={styles.profilePictureContainer}>
                                    <View
                                        style={[
                                            styles.profilePicture,
                                            {
                                                backgroundColor:
                                                    channelColor + "40",
                                            },
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.profilePictureInner,
                                                {
                                                    backgroundColor:
                                                        channelColor,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={
                                                    styles.profilePictureText
                                                }
                                            >
                                                {chat.name.charAt(0)}
                                            </Text>
                                        </View>
                                    </View>
                                    {chat.isOnline && (
                                        <View style={styles.onlineIndicator} />
                                    )}
                                </View>

                                {/* Chat Content */}
                                <View style={styles.chatContent}>
                                    <View style={styles.chatHeader}>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.chatName}>
                                                {chat.name}
                                            </Text>
                                            {chat.isStarred && (
                                                <Star
                                                    color={colors.dark.warning}
                                                    size={14}
                                                    fill={colors.dark.warning}
                                                    style={styles.starIcon}
                                                />
                                            )}
                                        </View>
                                        <Text style={styles.timestamp}>
                                            {chat.timestamp}
                                        </Text>
                                    </View>
                                    <View style={styles.messageContainer}>
                                        <Text
                                            style={[
                                                styles.lastMessage,
                                                chat.lastMessage.startsWith(
                                                    "you:"
                                                ) && styles.lastMessageSent,
                                            ]}
                                            numberOfLines={1}
                                        >
                                            {chat.lastMessage}
                                        </Text>
                                        {chat.isRead && !chat.unreadCount ? (
                                            <Check
                                                color={colors.dark.success}
                                                size={16}
                                                style={styles.readIcon}
                                            />
                                        ) : chat.unreadCount ? (
                                            <View
                                                style={[
                                                    styles.unreadBadge,
                                                    {
                                                        backgroundColor:
                                                            chat.isSelected
                                                                ? colors.dark
                                                                      .primary
                                                                : colors.dark
                                                                      .success,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={
                                                        styles.unreadBadgeText
                                                    }
                                                >
                                                    {chat.unreadCount}
                                                </Text>
                                            </View>
                                        ) : null}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
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
