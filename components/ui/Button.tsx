import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  GestureResponderEvent,
} from "react-native";

const Button = ({
  title,
  onPress,
}: {
  title: React.ReactNode;
  onPress(event: GestureResponderEvent): void;
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
