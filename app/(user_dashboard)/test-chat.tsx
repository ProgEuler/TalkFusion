import colors from "@/constants/colors";
import { selectCurrentToken } from "@/store/authSlice";
import { useRouter } from "expo-router";
import { ArrowLeft, Mic, Send } from "lucide-react-native";
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
import { useSelector } from "react-redux";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function TestChat() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const token = useSelector(selectCurrentToken);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!token) return;

    const socketUrl = `wss://ape-in-eft.ngrok-free.app/ws/testchat/?token=${token}`;
    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected to test chat");
      setIsConnected(true);
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("WebSocket message:", data);

      if (data.status === "typing") {
        setIsTyping(true);
        // Automatically hide typing after a short delay if no message arrives
        setTimeout(() => setIsTyping(false), 3000);
      } else if (data.message) {
        const newMessage: Message = {
          id: Date.now().toString(),
          text: data.message,
          sender: data.sender === "ai" ? "ai" : "ai", // Handle "Welcome" which might not have sender
          timestamp: new Date(),
        };

        // If it's the welcome message, it might not have "sender"
        if (!data.sender && data.message.includes("Welcome")) {
            newMessage.sender = "ai";
        }

        setMessages((prev) => [...prev, newMessage]);

        setIsTyping(false);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected from test chat");
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [token]);

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!message.trim() || !socketRef.current || !isConnected) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Send to WebSocket
    socketRef.current.send(JSON.stringify({ message: message.trim() }));

    setMessage("");
  };

  const renderDateSeparator = (date: Date) => {
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return (
      <View style={styles.dateSeparator} key={`date-${date.getTime()}`}>
        <Text style={styles.dateSeparatorText}>{formattedDate}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.length > 0 && renderDateSeparator(messages[0].timestamp)}

        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.sender === "user"
                ? styles.messageWrapperSent
                : styles.messageWrapperReceived,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.sender === "user"
                  ? styles.messageBubbleSent
                  : styles.messageBubbleReceived,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.sender === "user"
                    ? styles.messageTextSent
                    : styles.messageTextReceived,
                ]}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageWrapper, styles.messageWrapperReceived]}>
            <View style={[styles.messageBubble, styles.messageBubbleReceived]}>
              <Text style={styles.typingText}>Generating...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type your test message here..."
            placeholderTextColor={colors.dark.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <View style={styles.inputActions}>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={!message.trim() || !isConnected}
            >
              <Send
                color={message.trim() && isConnected ? colors.dark.primary : colors.dark.textSecondary}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.dark.background,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark.text,
  },
  backButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  dateSeparator: {
    alignItems: "center",
    marginVertical: 20,
  },
  dateSeparatorText: {
    color: colors.dark.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: "80%",
  },
  messageWrapperSent: {
    alignSelf: "flex-end",
  },
  messageWrapperReceived: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBubbleSent: {
    backgroundColor: colors.dark.primary,
    borderBottomRightRadius: 2,
  },
  messageBubbleReceived: {
    backgroundColor: colors.dark.cardBackground,
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  messageTextSent: {
    color: "#FFFFFF",
  },
  messageTextReceived: {
    color: "#FFFFFF",
  },
  typingText: {
    color: colors.dark.textSecondary,
    fontStyle: "italic",
    fontSize: 14,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: colors.dark.background,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    paddingVertical: 12,
    maxHeight: 120,
  },
  inputActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  sendButton: {
    padding: 4,
  },
});
