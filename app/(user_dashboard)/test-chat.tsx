import colors from "@/constants/colors";
import { selectCurrentToken } from "@/store/authSlice";
import { Send as SendIcon } from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
   Bubble,
   Composer,
   GiftedChat,
   IMessage,
   InputToolbar,
   Send,
   SystemMessage,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function TestChat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const insets = useSafeAreaInsets();
  const token = useSelector(selectCurrentToken);
  const socketRef = useRef<WebSocket | null>(null);

  const tabbarHeight = 75;
  const keyboardTopToolbarHeight = Platform.select({ ios: 44, default: 0 });
  const keyboardVerticalOffset =
    insets.bottom + tabbarHeight + keyboardTopToolbarHeight;

  useEffect(() => {
    if (!token) return;

    const socket = new WebSocket(
      `wss://ape-in-eft.ngrok-free.app/ws/testchat/?token=${token}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("AI WebSocket connected");
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("AI WebSocket message:", data);

      if (data.message && !data.sender) {
        // Welcome message or system message
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.random().toString(),
              text: data.message,
              createdAt: new Date(),
              system: true,
              user: { _id: 0 },
            } as any,
          ])
        );
      } else if (data.status === "typing") {
        setIsTyping(true);
      } else if (data.sender === "ai" || data.message) {
        setIsTyping(false);
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.random().toString(),
              text: data.message,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "AI Assistant",
                avatar: "https://placehold.co/100x100/0066FF/FFFFFF/png?text=AI",
              },
            },
          ])
        );
      }
    };

    socket.onerror = (error) => {
      console.log("AI WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("AI WebSocket disconnected");
      socketRef.current = null;
    };

   //  return () => {
   //    socket.close();
   //  };
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          message: newMessages[0].text,
        })
      );
    }
  }, []);

  const renderSystemMessage = (props: any) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginHorizontal: 75,
        }}
        textStyle={{
          color: colors.dark.textSecondary,
          fontSize: 14,
          fontWeight: "500",
        }}
      />
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        containerStyle={{
          left: { marginLeft: -8 },
          right: { marginRight: 0 },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: colors.dark.primary,
            borderRadius: 16,
            borderBottomRightRadius: 4,
            padding: 4,
            marginRight: 8,
          },
          left: {
            backgroundColor: colors.dark.cardBackground,
            borderRadius: 16,
            borderBottomLeftRadius: 4,
            borderWidth: 1,
            borderColor: colors.dark.border,
            padding: 4,
            marginLeft: 8,
          },
        }}
        textStyle={{
          right: {
            color: "#FFFFFF",
          },
          left: {
            color: "#FFFFFF",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={{ alignItems: "center", paddingBottom: 8 }}
      />
    );
  };

  const renderComposer = (props: any) => {
    return (
      <Composer
        {...props}
        textInputStyle={styles.composer}
        placeholderTextColor={colors.dark.textSecondary}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <View style={styles.sendButton}>
          <SendIcon color={colors.dark.text} size={20} />
        </View>
      </Send>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.dark.background }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        keyboardAvoidingViewProps={{ keyboardVerticalOffset }}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        // @ts-ignore
        alwaysShowSend
        minInputToolbarHeight={60}
        textInputStyle={{ color: colors.dark.text }}
        isTyping={isTyping}
        typingIndicatorStyle={{
          backgroundColor: colors.dark.primary,
        }}
        textInputProps={{
          placeholderTextColor: colors.dark.textSecondary,
          // @ts-ignore
          color: colors.dark.text,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputToolbar: {
    backgroundColor: colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  composer: {
    backgroundColor: colors.dark.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
    color: "#FFFFFF", // Explicitly white
    fontSize: 15,
    lineHeight: 20,
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.dark.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
