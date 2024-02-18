/**
 * paperless
 * messages/index.tsx
 * created: 26/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";
import { Appbar, IconButton, List, Text, useTheme } from "react-native-paper";

import { AppbarAction } from "@components";
import { Messsage, MessageSelector, useMessagesStore } from "@store/messages";

interface Props {}

const Messages: React.FC<Props> = () => {
  const router = useRouter();
  const colors = useTheme().colors;
  const messages = useMessagesStore(MessageSelector.messages);
  const getMessages = useMessagesStore(MessageSelector.getMessages);
  const markAsUse = useMessagesStore(MessageSelector.markAsUse);
  const deleteMessage = useMessagesStore(MessageSelector.deleteMessage);

  useEffect(() => {
    getMessages();
  }, []);

  const renderItem = ({ item }: { item: Messsage }) => {
    return (
      <List.Item
        title={item.sms.body}
        description={
          <Text>
            <Text variant="bodyMedium" style={{ color: colors.secondary }}>
              {`${item.sms.address} `}
            </Text>
            <Text variant="bodySmall" style={{ color: colors.outlineVariant }}>
              {item.sms.date.toLocaleString()}
            </Text>
          </Text>
        }
        right={(props) => (
          <>
            <IconButton
              {...props}
              onPress={() => deleteMessage(item.id)}
              icon="delete-outline"
            />
            <IconButton
              {...props}
              onPress={() => markAsUse(item.id)}
              icon={item.shouldUse ? "cash-check" : "cash-remove"}
            />
          </>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <AppbarAction
          sharedTransitionTag="messagesActionIcon"
          icon="chevron-left"
          mode="contained"
          onPress={router.back}
        />
      </Appbar.Header>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Messages;
