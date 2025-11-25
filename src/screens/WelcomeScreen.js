import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btntxt}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 30, fontWeight: "700" },
  btn: { marginTop: 20, padding: 15, backgroundColor: "black" },
  btntxt: { color: "white" },
});
