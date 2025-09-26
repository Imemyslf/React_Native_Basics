import { Pressable, StyleSheet, Text, View } from "react-native";
import DATA from "../../types/goalItemModule";

interface InputType {
  data: DATA;
  onDeleteItem: (text: string) => void;
}

const GoalItem = ({ data, onDeleteItem }: InputType) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#dddddd", radius: 10 }}
        onPress={onDeleteItem.bind(this, data.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{data.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    overflow: "hidden",
  },
  goalText: {
    padding: 8,
    color: "white",
  },
  pressedItem: {
    opacity: 0.5,
  },
});

export default GoalItem;
