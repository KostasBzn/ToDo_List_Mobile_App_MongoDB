import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "./screens/IntroScreen.js";
import SignInScreen from "./screens/SignInScreen.js";
import SignUpScreen from "./screens/SignUpScreen.js";
import TodosScreen from "./screens/TodosScreen.js";
import AddTodoScreen from "./screens/AddTodoScreen.js";
import UserProvider from "./contexts/userContext.js";
import TodoProvider from "./contexts/todoContext.js";
import EditScreen from "./screens/EditScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <TodoProvider>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="Intro">
            <Stack.Screen
              name="Intro"
              component={IntroScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TodosList"
              component={TodosScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddTodo"
              component={AddTodoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditTodo"
              component={EditScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </TodoProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
