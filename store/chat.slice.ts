import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Room {
  id: string;
  room_id: string; // The API seems to use room_id sometimes, we should standardize
  client_id: string; // name
  lastMessage: string;
  timestamp: string;
  profilePicture?: string;
  isOnline?: boolean;
  isStarred?: boolean;
  isSelected?: boolean;
  unreadCount?: number;
  isRead?: boolean;
  channel: "facebook" | "whatsapp" | "instagram" | "chat";
  message_type?: string;
  profile_name?: string;
  profile_id?: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  isRead?: boolean;
  type?: "outgoing" | "incoming"; // To match UI logic
}

interface ChatState {
  rooms: Room[];
  // Map of room_id to list of messages
  messages: Record<string, Message[]>;
}

const initialState: ChatState = {
  rooms: [],
  messages: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    updateRoomLastMessage: (
      state,
      action: PayloadAction<{
        roomId: string;
        message: string;
        timestamp: string;
        messageType: string;
      }>
    ) => {
      const { roomId, message, timestamp, messageType } = action.payload;
      const roomIndex = state.rooms.findIndex(
        (r) => r.room_id === roomId || r.id === roomId
      );
      if (roomIndex !== -1) {
        state.rooms[roomIndex].lastMessage = message;
        state.rooms[roomIndex].timestamp = timestamp;
        state.rooms[roomIndex].message_type = messageType;
        // Move to top?
        const room = state.rooms.splice(roomIndex, 1)[0];
        state.rooms.unshift(room);
      }
    },
    addMessage: (
      state,
      action: PayloadAction<{ roomId: string; message: Message }>
    ) => {
      const { roomId, message } = action.payload;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      // Avoid duplicates if needed, but for now just push
      // Check if message ID exists?
      if (!state.messages[roomId].find((m) => m.id === message.id)) {
        state.messages[roomId].push(message);
      }
    },
    setMessages: (
      state,
      action: PayloadAction<{ roomId: string; messages: Message[] }>
    ) => {
      const { roomId, messages } = action.payload;
      state.messages[roomId] = messages;
    },
  },
});

export const { setRooms, updateRoomLastMessage, addMessage, setMessages } =
  chatSlice.actions;

export const selectAllRooms = (state: { chat: ChatState }) => state.chat.rooms;
export const selectRoomMessages =
  (roomId: string) => (state: { chat: ChatState }) =>
    state.chat.messages[roomId] || [];

export default chatSlice.reducer;
