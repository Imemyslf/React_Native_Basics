import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "./constants/color";
import GameOverScreen from "./screens/GameOver";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

const deviceWidth: number = Dimensions.get("window").width;

export default function Index() {
  const [userNos, setUserNos] = useState<number | null>(null);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [guessRounds, setGuessRound] = useState<number>(0);

  const pickedNumberHandler = (pickedNumber: number) => {
    setUserNos(pickedNumber);
  };

  const gameOver = (guessRounds: number) => {
    setGuessRound(guessRounds);
    setGameIsOver(true);
  };

  const startNewGameHandler = () => {
    setUserNos(null);
    setGuessRound(0);
    setGameIsOver(false);
  };

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

  if (userNos) {
    screen = <GameScreen userNumber={userNos} onGameOver={gameOver} />;
  }

  if (gameIsOver && userNos) {
    screen = (
      <GameOverScreen
        userNumber={userNos}
        roundsNumber={guessRounds}
        onGameStart={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootContainer}
      >
        <ImageBackground
          source={require("../assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootContainer}
          imageStyle={styles.backgrounImage}
        >
          <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  backgrounImage: {
    opacity: 0.15,
  },
});
