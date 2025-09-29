import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "./constants/color";
import GameOverScreen from "./screens/GameOver";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function Index() {
  const [userNos, setUserNos] = useState<number>();
  const [gameIsOver, setGameISOver] = useState<boolean>(false);

  const pickedNumberHandler = (pickedNumber: number) => {
    setUserNos(pickedNumber);
  };

  const gameOver = () => {
    setGameISOver(true);
  };

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

  if (userNos) {
    screen = <GameScreen userNumber={userNos} onGameOver={gameOver} />;
  }

  if (gameIsOver && userNos) {
    screen = <GameOverScreen />;
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
