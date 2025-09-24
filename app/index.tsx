// import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Button, Alert } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text>Another Piece of text!</Text>
      </View>
      <Text>Hello World!!</Text>
      <Button
        title="Tap Me!"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
    </View>
  );
}
