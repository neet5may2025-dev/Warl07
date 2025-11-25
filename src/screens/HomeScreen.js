import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Menu</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("NCERTSearch")}
      >
        <Text style={styles.btntxt}>NCERT Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("FingerSolver")}
      >
        <Text style={styles.btntxt}>Finger Solver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("MCQSolver")}
      >
        <Text style={styles.btntxt}>MCQ Solver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("VoiceAssistant")}
      >
        <Text style={styles.btntxt}>Voice Assistant</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("AIDashboard")}
      >
        <Text style={styles.btntxt}>AI Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  btn: {
    width: 200,
    padding: 15,
    backgroundColor: "black",
    marginVertical: 8,
  },
  btntxt: { color: "white", textAlign: "center" },
});
