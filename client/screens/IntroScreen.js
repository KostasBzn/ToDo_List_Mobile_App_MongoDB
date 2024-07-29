import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../style/colors.js";

const IntroScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ToDo Mate</Text>
        <Text style={styles.slogan}>Manage your tasks in the best way!</Text>
      </View>
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Text style={styles.featureText}>Create tasks</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureText}>Delete Tasks</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureText}>
            Edit your tasks and be always updated
          </Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.blue,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 76,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.orange,
  },
  slogan: {
    fontSize: 36,
    fontWeight: "500",
    textAlign: "center",
    color: colors.orange,
  },
  featuresContainer: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  feature: {
    backgroundColor: colors.beige,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  featureText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.orange,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "35%",
    height: 40,
    backgroundColor: colors.beige,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: colors.orange,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default IntroScreen;
