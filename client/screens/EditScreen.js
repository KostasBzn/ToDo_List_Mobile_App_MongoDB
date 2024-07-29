import { useState, useEffect, useContext } from "react";
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
import { TodoContext } from "../contexts/todoContext.js";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function EditTodoScreen() {
  const { updateTodo, findTodo } = useContext(TodoContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { todoId } = route.params;
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const getTodo = async () => {
    try {
      const todo = await findTodo(todoId);
      setTitle(todo.title);
      setDescription(todo.description);
      //setStatus(todo.status);
    } catch (error) {
      console.error("Error fetching todo", error);
    }
  };

  useEffect(() => {
    getTodo();
  }, [todoId]);

  const handleSave = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setButtonIsLoading(true);
      await updateTodo(todoId, title, description, status);
      //console.log("Todo updated:", { id: todoId, title, description, status });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Error updating todo");
      console.error("Error updating todo", error);
    } finally {
      setButtonIsLoading(false);
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  };

  const handleCancel = () => {
    navigation.navigate("TodosList");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Todo</Text>
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
          <Text style={styles.loadingText}>Saving...</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
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
