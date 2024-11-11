import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchChatStats,
  useFetchMessages,
  useNewIncomingMessageChatHandler,
  useReadAllChatMessages,
} from "./hooks";
import { Chat } from "@/pages/chat";
import {
  ChatMessage,
  createWsMessage,
  useChoppTheme,
  WS_MESSAGE_TYPE,
  WsMessage,
} from "@/shared";
import { useFilterWsMessages } from "@/shared/hooks";
import { wsSend } from "@/store/slices/ws-slice";
import { AppDispatch, RootState } from "@/store/store";
import { useChatsContext } from "@/shared/context/chats-context";

export default function TabSupportChat() {
  const { theme } = useChoppTheme();
  const flatListRef = useRef(null);
  const [text, setText] = useState("");
  const { messages, setMessages } = useChatsContext();
  
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  // const { wsConnected } = useSelector((state: RootState) => state.ws);
  // const { lastMessage: chatHistory } = useFilterWsMessages(
  //   WS_MESSAGE_TYPE.CHAT_HISTORY,
  // );
  // const { lastMessage: typingStatus } = useFilterWsMessages(
  //   WS_MESSAGE_TYPE.TYPING,
  // );
  const { lastMessage: newMessage } = useFilterWsMessages<ChatMessage>(
    WS_MESSAGE_TYPE.MESSAGE,
  );

  useNewIncomingMessageChatHandler({ flatListRef });

  const handleSendMessage = () => {
    if (text.trim()) {
      // Создаем и отправляем ws-сообщение
      const newMessage = {
        type: WS_MESSAGE_TYPE.MESSAGE,
        payload: {
          timeStamp: Date.now(),
          text,
          senderId: currentUser?.id,
          chatId: currentUser?.chatWithAdminId,
          wasReadBy: [currentUser?.id],
        } as ChatMessage,
      };

      dispatch(wsSend(newMessage));
      setText(""); // Очистка TextArea после отправки сообщения
      //Обновить открытые сообщения
      setMessages((prev) => {
        return [...prev, newMessage.payload];
      });

      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Chat
        ref={flatListRef}
        // isTyping={typingStatus?.code === "typingStarted"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TextInput
              onFocus={() => {
                setTimeout(() => {
                  flatListRef.current.scrollToEnd({ animated: true });
                }, 100);
              }}
              multiline
              value={text}
              onChangeText={setText}
              mode="outlined"
              numberOfLines={1}
              style={styles.input}
            />
            <IconButton
              disabled={!text}
              icon="send"
              iconColor={theme.colors.primary}
              size={32}
              onPress={handleSendMessage}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
    width: "100%",
  },
  input: {
    flex: 1,
  },
});
