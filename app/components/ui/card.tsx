import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/color";

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 25,
    padding: 20,
    backgroundColor: Colors.primary800,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
