import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/userContext.js";
import colors from "../../style/colors.js";

const TodoListNavbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.navigate("Intro");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      toggleMenu();
    }
  };

  const handleOverlayPress = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.leftSection}>
        <Text style={styles.userName}>{user ? user.name : "User"}</Text>
      </View>
      <Text style={styles.title}>Todo List</Text>
      <TouchableOpacity onPress={toggleMenu}>
        <Image
          source={require("../../assets/svg/navbarMenu.png")}
          style={styles.menu}
        />
      </TouchableOpacity>
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
              <Image
                source={require("../../assets/svg/logout.png")}
                style={styles.menuLogo}
              />
              <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    width: "100%",
    backgroundColor: colors.brown,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 40,
    zIndex: 5,
    borderRadius: 10,

    flexDirection: "row",
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 15,
    color: colors.beige,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.beige,
  },
  menu: {
    width: 30,
    height: 30,
    tintColor: colors.beige,
  },

  dropdownMenu: {
    position: "absolute",
    top: 60,
    right: 0,
    backgroundColor: colors.brown,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    zIndex: 10,
    width: "50%",
  },
  menuItem: {
    fontSize: 16,
    color: colors.beige,
    paddingVertical: 5,
    fontWeight: "500",
    marginVertical: 3,
  },
  menuLogo: {
    width: 20,
    height: 20,
    tintColor: colors.beige,
    marginRight: 5,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TodoListNavbar;
