/**
 * paperless
 * messages.ts
 * created: 18/02/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SMS, getMessages } from "modules/read-sms";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Messsage = {
  id: string;
  sms: SMS;
  shouldUse: boolean;
  deleted: boolean;
};

export interface MessagesState {
  messages: Messsage[];
  lastRead?: string;
  getMessages: () => void;
  markAsUse: (id: string) => void;
  deleteMessage: (id: string) => void;
}

export const MessageSelector = {
  messages: (state: MessagesState) => state.messages.filter((message) => !message.deleted),
  getMessages: (state: MessagesState) => state.getMessages,
  markAsUse: (state: MessagesState) => state.markAsUse,
  deleteMessage: (state: MessagesState) => state.deleteMessage,
};

export const useMessagesStore = create<MessagesState>()(
  persist(
    (set, get) => ({
      messages: [],
      getMessages: async () => {
        const messages = await getMessages(get().lastRead);
        // if there are no new messages
        if (!messages.length) {
          return;
        }
        set((state) => {
          return {
            // create a new message for each SMS
            messages: messages.map((message) => ({
              id: message.date.toString(),
              sms: message,
              shouldUse: false,
              deleted: false,
            })),
            // set the last read date to the first message
            // it is sorted with date desc
            lastRead: messages[0].date.toString(),
          };
        });
      },
      markAsUse: (id) =>
        set(() => ({
          messages: get().messages.map((message) => {
            if (message.id === id) {
              message.shouldUse = !message.shouldUse;
            }
            return message;
          }),
        })),
      deleteMessage: (id) =>
        set(() => ({
          messages: get().messages.map((message) => {
            if (message.id === id) {
              message.deleted = true;
            }
            return message;
          }),
        })),
    }),
    {
      name: "message-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
