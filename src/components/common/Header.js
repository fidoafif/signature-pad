import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Header = ({ text }) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    height: 60,
    paddingTop: 15,
    backgroundColor: "#4A148C",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
    position: "relative",
  },
  textStyle: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});

export { Header };
