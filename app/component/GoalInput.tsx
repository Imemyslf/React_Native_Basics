import { useState } from "react";
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
interface GoalInputProps {
  visible: boolean;
  onPress: (text: string) => void;
  showModal: () => void;
}

const GoalInput = ({ visible, onPress, showModal }: GoalInputProps) => {
  const [enteredGoaltext, setEnteredGoalText] = useState<string>("");

  const goalInputHandler = (enteredtext: string) => {
    setEnteredGoalText(enteredtext);
  };

  const addGoalHandler = () => {
    onPress(enteredGoaltext);
    showModal();
    setEnteredGoalText("");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/goal.jpg")}
            // blurRadius={5}
            // resizeMethod="resize"
            resizeMode="stretch"
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Your Course Goal"
          onChangeText={goalInputHandler}
          value={enteredGoaltext}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Work" onPress={addGoalHandler} color="#b180f0" />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={showModal} color="#f31282" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 20,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 9,
  },
  imageContainer: {},
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: "30%",
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default GoalInput;
