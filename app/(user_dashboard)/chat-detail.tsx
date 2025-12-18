import { useGetOldChatQuery } from "@/api/user-api/chat.api";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { selectRoomMessages } from "@/store/chat.slice";
import { timeAgo } from "@/utils/helpers";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { RefreshControl } from "react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function ChatDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ roomId: string; channel?: string; clientId: string }>();

  const scrollViewRef = useRef<ScrollView>(null);

  const realtimeMessages = useSelector(
    selectRoomMessages(params.roomId)
  );

  const {
    data: historicalMessages,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useGetOldChatQuery(
    {
      roomId: params.roomId,
      channel: params.channel,
    },
    {
      skip: !params.roomId || !params.channel,
    }
  );

  console.log(params)

  const allMessages = React.useMemo(() => {
    const history = historicalMessages || [];
    const historyIds = new Set(history.map((m) => m.id));
    const newUnique = realtimeMessages.filter((m) => !historyIds.has(m.id));
    return [...history, ...newUnique];
  }, [historicalMessages, realtimeMessages]);

  const chatName = params.clientId || "Unknown";

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [allMessages]);

    if(isLoading) return <LoadingSpinner />
  if(isError) return <ErrorScreen />

  return (
   //  <Layout
   //        refreshControl={
   //       <RefreshControl refreshing={isFetching} onRefresh={refetch} />
   //     }>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header */}
      <View
        style={[styles.header, { paddingTop: insets.top, paddingBottom: 12 }]}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.replace("/(user_dashboard)/chat-history")}
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
              <Text style={styles.profileAvatarText}>{chatName.charAt(0)}</Text>
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
        {allMessages?.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.type === "outgoing"
                ? styles.messageWrapperSent
                : styles.messageWrapperReceived,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.type === "outgoing"
                  ? styles.messageBubbleSent
                  : styles.messageBubbleReceived,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.type === "outgoing"
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
                    msg.type === "outgoing"
                      ? styles.messageTimeSent
                      : styles.messageTimeReceived,
                  ]}
                >
                  {timeAgo(msg.timestamp)}
                </Text>
                <View style={styles.readIndicator}>
                  <Text style={styles.unreadIcon}>✓</Text>
                </View>
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
//  </Layout>
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
