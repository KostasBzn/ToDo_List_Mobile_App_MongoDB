import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import colors from "../style/colors.js";
import LoadingSpinner from "../components/loading/LoadingSpinner.js";
import { UserContext } from "../contexts/userContext.js";
import { useNavigation } from "@react-navigation/native";
import AuthNavbar from "../components/navbar/AuthNavbar.js";

export default function SignUpScreen() {
  const { signUp, operationStatus, setOperationStatus } =
    useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      setButtonIsLoading(true);
      await signUp(name, email, password);
    } catch (error) {
      Alert.alert("Error", "Error registering user");
      console.error("Error registering user", error);
    } finally {
      setButtonIsLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (operationStatus.success && operationStatus.type === "signUp") {
      navigation.navigate("SignIn");
      setOperationStatus({ success: false });
    }
  }, [operationStatus]);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  return (
    <View style={styles.container}>
      <AuthNavbar />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="none"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {buttonIsLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
          <Text style={styles.loadingText}>Registering...</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={buttonIsLoading}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.orange,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: colors.orange,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: colors.beige,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: colors.orange,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: colors.beige,
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
    width: "80%",
    height: 40,
    backgroundColor: colors.orange,
    borderRadius: 20,
  },
  loadingText: {
    marginLeft: 10,
    marginRight: 10,
    color: colors.beige,
    fontSize: 16,
  },
  textContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  text: {
    color: colors.beige,
    marginRight: 5,
  },
  linkText: {
    color: colors.orange,
    fontWeight: "bold",
  },
});
