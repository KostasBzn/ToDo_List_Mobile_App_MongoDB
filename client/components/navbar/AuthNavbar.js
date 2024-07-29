import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../style/colors.js";

const AuthNavbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Intro")}>
        <Text style={styles.title}>Todo Mate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 70,
    zIndex: 5,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.beige,
  },
});

export default AuthNavbar;
