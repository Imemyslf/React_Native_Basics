import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/color";

interface PBTypes {
  children: ReactNode;
  onPress: () => void;
}

const PrimaryButton = ({ children, onPress }: PBTypes) => {
  const Presshandler = () => {
    onPress();
  };
  return (
    <>
      <View style={styles.buttonOuterContainer}>
        <Pressable
          onPress={Presshandler}
          style={({ pressed }) =>
            pressed
              ? [
                  styles.buttonInnerConatiner,
                  pressed && { opacity: 0.75 }, //Do this while working on Expo app and ios device to ge button feedback
                ]
              : styles.buttonInnerConatiner
          }
          android_ripple={{ color: Colors.primary600 }} // Actual Android effect to ge button feedback
        >
          <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerConatiner: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
export default PrimaryButton;
