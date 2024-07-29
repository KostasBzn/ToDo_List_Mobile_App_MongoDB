import { useState } from "react";
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
import { useContext } from "react";
import { TodoContext } from "../contexts/todoContext.js";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/userContext.js";

export default function CreateTodoScreen() {
  const { createTodo } = useContext(TodoContext);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setButtonIsLoading(true);
      await createTodo(title, description, user._id);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Error creating todo");
      console.error("Error creating todo", error);
    } finally {
      setButtonIsLoading(false);
      //setTitle("");
      //setDescription("");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Todo</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      {buttonIsLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
          <Text style={styles.loadingText}>Creating...</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
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
  textarea: {
    height: 100,
    textAlignVertical: "top",
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
});
