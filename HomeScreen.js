import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

export default function HomeScreen({ navigation }) {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    playDailyVoice();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const playDailyVoice = async () => {
    try {
      const today = new Date().toDateString();
      const lastPlayed = await AsyncStorage.getItem("voicePlayedDate");

      if (lastPlayed !== today) {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/chalo_shuru_krte_hai.mp3")
        );

        await sound.playAsync();
        await AsyncStorage.setItem("voicePlayedDate", today);
      }
    } catch (err) {
      console.log("Voice Error:", err);
    }
  };

  return (
    <View style={styles.container}>

      <Animated.View
        style={[
          styles.centerBox,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.title}>Study Mother AI</Text>
        <Text style={styles.tagline}>
          Padhai Maa ki tarah, pyaar ke saath
        </Text>

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.replace("AIDashboard")}
        >
          <Text style={styles.btnText}>Start Learning</Text>
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  centerBox: {
    backgroundColor: "#0f172a",
    padding: 25,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    elevation: 10
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8
  },

  tagline: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 30,
    textAlign: "center"
  },

  startBtn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12
  },

  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  }
});