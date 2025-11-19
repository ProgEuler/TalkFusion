import colors from "@/constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ArrowLeft,
    Image as ImageIcon,
    Send,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
    id: string;
    text: string;
    timestamp: string;
    isSent: boolean;
    isRead?: boolean;
}

// Mock messages data - in real app, this would come from API/state
const mockMessages: Record<string, Message[]> = {
    "1": [
        {
            id: "1",
            text: "Hello! How are you doing?",
            timestamp: "14:30",
            isSent: false,
            isRead: true,
        },
        {
            id: "2",
            text: "Hi! I'm doing great, thanks for asking!",
            timestamp: "14:32",
            isSent: true,
            isRead: true,
        },
        {
            id: "3",
            text: "That's wonderful to hear!",
            timestamp: "14:33",
            isSent: false,
            isRead: true,
        },
        {
            id: "4",
            text: "How can I help you today?",
            timestamp: "14:35",
            isSent: true,
            isRead: true,
        },
    ],
    "2": [
        {
            id: "1",
            text: "Hey! Are we still on for tomorrow?",
            timestamp: "15:20",
            isSent: false,
            isRead: true,
        },
        {
            id: "2",
            text: "Yes, absolutely! See you tomorrow!",
            timestamp: "15:22",
            isSent: true,
            isRead: false,
        },
        {
            id: "3",
            text: "Perfect! Looking forward to it.",
            timestamp: "16:45",
            isSent: false,
            isRead: false,
        },
    ],
    "3": [
        {
            id: "1",
            text: "Thank you so much! 😊",
            timestamp: "13:15",
            isSent: false,
            isRead: true,
        },
        {
            id: "2",
            text: "You're very welcome!",
            timestamp: "13:16",
            isSent: true,
            isRead: true,
        },
    ],
    "4": [
        {
            id: "1",
            text: "I'll be there in 10 minutes",
            timestamp: "12:30",
            isSent: false,
            isRead: false,
        },
        {
            id: "2",
            text: "Great! I'll wait for you.",
            timestamp: "12:31",
            isSent: true,
            isRead: false,
        },
    ],
    "5": [
        {
            id: "1",
            text: "Can we reschedule?",
            timestamp: "11:00",
            isSent: false,
            isRead: true,
        },
        {
            id: "2",
            text: "Sure, when would work for you?",
            timestamp: "11:05",
            isSent: true,
            isRead: true,
        },
    ],
    "6": [
        {
            id: "1",
            text: "Great! Looking forward to it",
            timestamp: "10:00",
            isSent: false,
            isRead: true,
        },
    ],
};

const mockChatNames: Record<string, string> = {
    "1": "John Doe",
    "2": "Travis Barker",
    "3": "Kate Rose",
    "4": "Robert Parker",
    "5": "Sarah Johnson",
    "6": "Mike Wilson",
};

export default function ChatDetailScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const params = useLocalSearchParams<{ chatId: string }>();
    const scrollViewRef = useRef<ScrollView>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>(
        mockMessages[params.chatId || "1"] || []
    );

    const chatId = params.chatId || "1";
    const chatName = mockChatNames[chatId] || "Unknown";

    useEffect(() => {
        // Scroll to bottom when messages change
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: message.trim(),
                timestamp: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }),
                isSent: true,
                isRead: false,
            };
            setMessages([...messages, newMessage]);
            setMessage("");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            {/* Header */}
            <View
                style={[
                    styles.header,
                    { paddingTop: insets.top, paddingBottom: 12 },
                ]}
            >
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => router.replace("/(dashboard)/chat-history")}
                        style={styles.backButton}
                    >
                        <ArrowLeft color={colors.dark.text} size={24} />
                    </TouchableOpacity>
                    <View style={styles.profileInfo}>
                        <View
                            style={[
                                styles.profileAvatar,
                                { backgroundColor: colors.dark.primary },
                            ]}
                        >
                            <Text style={styles.profileAvatarText}>
                                {chatName.charAt(0)}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.chatName}>{chatName}</Text>
                            <Text style={styles.chatStatus}>Online</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Messages List */}
            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
            >
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageWrapper,
                            msg.isSent
                                ? styles.messageWrapperSent
                                : styles.messageWrapperReceived,
                        ]}
                    >
                        <View
                            style={[
                                styles.messageBubble,
                                msg.isSent
                                    ? styles.messageBubbleSent
                                    : styles.messageBubbleReceived,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.messageText,
                                    msg.isSent
                                        ? styles.messageTextSent
                                        : styles.messageTextReceived,
                                ]}
                            >
                                {msg.text}
                            </Text>
                            <View style={styles.messageFooter}>
                                <Text
                                    style={[
                                        styles.messageTime,
                                        msg.isSent
                                            ? styles.messageTimeSent
                                            : styles.messageTimeReceived,
                                    ]}
                                >
                                    {msg.timestamp}
                                </Text>
                                {msg.isSent && (
                                    <View style={styles.readIndicator}>
                                        {msg.isRead ? (
                                            <Text style={styles.readIcon}>
                                                ✓✓
                                            </Text>
                                        ) : (
                                            <Text style={styles.unreadIcon}>
                                                ✓
                                            </Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Input Area */}
            {/* <View
                style={[
                    styles.inputContainer,
                    { paddingBottom: insets.bottom + 8 },
                ]}
            >
                <TouchableOpacity style={styles.attachButton}>
                    <ImageIcon color={colors.dark.textSecondary} size={24} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor={colors.dark.textSecondary}
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    maxLength={500}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        message.trim()
                            ? styles.sendButtonActive
                            : styles.sendButtonInactive,
                    ]}
                    onPress={handleSendMessage}
                    disabled={!message.trim()}
                >
                    <Send
                        color={
                            message.trim()
                                ? colors.dark.text
                                : colors.dark.textSecondary
                        }
                        size={20}
                    />
                </TouchableOpacity>
            </View> */}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.dark.cardBackground,
        borderBottomWidth: 1,
        borderBottomColor: colors.dark.border,
        paddingHorizontal: 16,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    backButton: {
        marginRight: 12,
        padding: 4,
    },
    profileInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    profileAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    profileAvatarText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.dark.text,
    },
    chatName: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.dark.text,
    },
    chatStatus: {
        fontSize: 12,
        color: colors.dark.success,
        fontWeight: "500",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    headerButton: {
        padding: 8,
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        padding: 16,
        paddingBottom: 8,
    },
    messageWrapper: {
        marginBottom: 12,
        maxWidth: "75%",
    },
    messageWrapperSent: {
        alignSelf: "flex-end",
        alignItems: "flex-end",
    },
    messageWrapperReceived: {
        alignSelf: "flex-start",
        alignItems: "flex-start",
    },
    messageBubble: {
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        minWidth: 60,
    },
    messageBubbleSent: {
        backgroundColor: colors.dark.primary,
        borderBottomRightRadius: 4,
    },
    messageBubbleReceived: {
        backgroundColor: colors.dark.cardBackground,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: colors.dark.border,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 4,
    },
    messageTextSent: {
        color: colors.dark.text,
    },
    messageTextReceived: {
        color: colors.dark.text,
    },
    messageFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 4,
    },
    messageTime: {
        fontSize: 11,
        fontWeight: "500",
    },
    messageTimeSent: {
        color: colors.dark.text + "80",
    },
    messageTimeReceived: {
        color: colors.dark.textSecondary,
    },
    readIndicator: {
        marginLeft: 2,
    },
    readIcon: {
        fontSize: 12,
        color: colors.dark.text + "80",
    },
    unreadIcon: {
        fontSize: 12,
        color: colors.dark.text + "80",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: colors.dark.cardBackground,
        borderTopWidth: 1,
        borderTopColor: colors.dark.border,
        paddingHorizontal: 12,
        paddingTop: 8,
        gap: 8,
    },
    attachButton: {
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: colors.dark.background,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 15,
        color: colors.dark.text,
        maxHeight: 100,
        borderWidth: 1,
        borderColor: colors.dark.border,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.dark.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    sendButtonActive: {
        backgroundColor: colors.dark.primary,
    },
    sendButtonInactive: {
        backgroundColor: colors.dark.cardBackground,
    },
});
