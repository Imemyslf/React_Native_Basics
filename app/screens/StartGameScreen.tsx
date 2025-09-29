import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import Card from "../components/ui/card";
import InstructionText from "../components/ui/instructionUI";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/color";

interface SGSTypes {
  onPickedNumber: (pickedNumber: number) => void;
}

const StartGameScreen = ({ onPickedNumber }: SGSTypes) => {
  const [enteredNumber, setEnterednumber] = useState<string>("");

  const numberInputHandler = (enteredText: string) => {
    setEnterednumber(enteredText);
  };

  const resetInputhandler = () => {
    setEnterednumber("");
  };

  const confirmInputHandler = () => {
    const chosenNumber: number = +enteredNumber;

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number!",
        "Number has to be a number between 1 and 99",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: resetInputhandler,
          },
        ]
      );
      return;
    }
    onPickedNumber(chosenNumber);
  };
  return (
    <>
      <View style={styles.rootContainer}>
        <Title>Guess My Number</Title>
        <Card>
          <InstructionText>Enter a Number</InstructionText>
          <TextInput
            style={styles.numberInput}
            maxLength={2}
            keyboardType="number-pad"
            value={enteredNumber}
            onChangeText={numberInputHandler}
          />
          <View style={styles.buttonsConatiner}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={resetInputhandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={confirmInputHandler}>
                Confirm
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },

  numberInput: {
    height: 55,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonsConatiner: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
