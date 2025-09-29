import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import GuessLogItem from "../components/game/GuesslogItem";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/card";
import InstructionText from "../components/ui/instructionUI";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";

interface GameScreenType {
  userNumber: number;
  onGameOver: (nos: number) => void;
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
  const [guessRounds, setGuessRounds] = useState<number[]>([]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, guessRounds, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
    setGuessRounds((previousGuessRound) => [
      newRndNumber,
      ...previousGuessRound,
    ]);
  }

  const guessRoundsListLength = guessRounds.length;

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
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <View style={styles.listConatiner}>
          <FlatList
            data={guessRounds}
            renderItem={(itemData) => (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            )}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
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
  listConatiner: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
