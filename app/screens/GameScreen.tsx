import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/card";
import InstructionText from "../components/ui/instructionUI";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";

interface GameScreenType {
  userNumber: number;
  onGameOver: () => void;
}

const generateRandomBetween = (min: number, max: number, exclude: number) => {
  const random = Math.floor(Math.random() * (max - min)) + min;

  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return random;
  }
};

let minBoundary: number = 1;
let maxBoundary: number = 100;

const GameScreen = ({ userNumber, onGameOver }: GameScreenType) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, SetCurrentGuess] = useState<number>(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction: string) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    SetCurrentGuess(newRndNumber);
  }

  return (
    <>
      <View style={styles.screen}>
        <Title>Opponent&apos;s choice</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
          <InstructionText style={styles.instructionTex}>
            Higher or Lower
          </InstructionText>
          <View style={styles.buttonsConatiner}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
                <Ionicons name="add" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="remove" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionTex: {
    marginBottom: 12,
  },
  buttonsConatiner: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default GameScreen;
