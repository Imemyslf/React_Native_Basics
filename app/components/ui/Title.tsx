import { StyleSheet, Text } from "react-native";

interface TitleTypes {
  children: string;
}

const Title = ({ children }: TitleTypes) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
  },
});

export default Title;
