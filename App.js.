import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AIDashboard from "./src/screens/AIDashboard";
import MCQSolver from "./src/screens/MCQSolver";
import NCERTSearch from "./src/screens/NCERTSearch";
import PYQSearch from "./src/screens/PYQSearch";
import PYQVoiceSearch from "./src/screens/PYQVoiceSearch";
import ExplainAnswer from "./src/screens/ExplainAnswer";
import VoiceDoubtAI from "./src/screens/VoiceDoubtAI";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* FIRST SCREEN */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* MAIN APP */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AIDashboard" component={AIDashboard} />
        <Stack.Screen name="MCQSolver" component={MCQSolver} />
        <Stack.Screen name="NCERTSearch" component={NCERTSearch} />
        <Stack.Screen name="PYQSearch" component={PYQSearch} />
        <Stack.Screen name="PYQVoiceSearch" component={PYQVoiceSearch} />
        <Stack.Screen name="ExplainAnswer" component={ExplainAnswer} />
        <Stack.Screen name="VoiceDoubtAI" component={VoiceDoubtAI} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}