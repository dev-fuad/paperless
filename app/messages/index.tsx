/**
 * paperless
 * messages/index.tsx
 * created: 26/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getMessages } from "modules/read-sms";

interface Props {}

const Messages: React.FC<Props> = () => {
  useEffect(() => {
    getMessages().then((res) => {
      console.log(res.map((item) => item.body).join("\n"));
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default Messages;
