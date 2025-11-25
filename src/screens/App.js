import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AIDashboard from "./src/screens/AIDashboard";
import MCQSolver from "./src/screens/MCQSolver";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AIDashboard" component={AIDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="MCQSolver" component={MCQSolver} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
