import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import NCERTSearch from "./src/screens/NCERTSearch";
import FingerSolver from "./src/screens/FingerSolver";
import MCQSolver from "./src/screens/MCQSolver";
import VoiceAssistant from "./src/screens/VoiceAssistant";
import AIDashboard from "./src/screens/AIDashboard";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NCERTSearch" component={NCERTSearch} />
        <Stack.Screen name="FingerSolver" component={FingerSolver} />
        <Stack.Screen name="MCQSolver" component={MCQSolver} />
        <Stack.Screen name="VoiceAssistant" component={VoiceAssistant} />
        <Stack.Screen name="AIDashboard" component={AIDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
