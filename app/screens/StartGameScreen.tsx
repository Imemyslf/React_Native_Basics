import { useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Card from "../components/ui/card";
import InstructionText from "../components/ui/instructionUI";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/color";

interface SGSTypes {
  onPickedNumber: (pickedNumber: number) => void;
}

const StartGameScreen = ({ onPickedNumber }: SGSTypes) => {
  const { width, height } = useWindowDimensions();

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

  const marginTopDistance = height < 400 ? 30 : 150;

  return (
    <>
      <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
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

export default StartGameScreen;

const deviceHeight: number = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 400 ? 30 : 100,
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
