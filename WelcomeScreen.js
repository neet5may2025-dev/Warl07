import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated
} from "react-native";

export default function WelcomeScreen({ navigation }) {

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true
      })
    ]).start();

    // Auto move to Home after 3 seconds
    setTimeout(() => {
      navigation.replace("Home");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.innerBox,
          { opacity: fade, transform: [{ scale }] }
        ]}
      >
        <Image
          source={require("../../assets/welcome.png")}
          style={styles.image}
        />

        <Text style={styles.title}>Study Mother</Text>
        <Text style={styles.subtitle}>
          Maa jaisa pyaar, AI jaisi power
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center"
  },

  innerBox: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20
  },

  image: {
    width: 260,
    height: 260,
    resizeMode: "contain",
    marginBottom: 30
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6
  },

  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    textAlign: "center"
  }
});