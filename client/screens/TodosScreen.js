import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import colors from "../style/colors";
import TodoListNavbar from "../components/navbar/TodoListNavbar.js";
import LoadingSpinner from "../components/loading/LoadingSpinner.js";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../contexts/todoContext.js";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/userContext.js";

const TodosScreen = () => {
  const { todos, fetchTodosForUser, deleteTodo, updateTodo } =
    useContext(TodoContext);
  const { user } = useContext(UserContext);

  const [buttonIsLoading, setButtonIsLoading] = useState({
    status: false,
    button: "",
    buttonId: "",
  });

  const navigation = useNavigation();

  useEffect(() => {
    fetchTodosForUser(user?._id);
  }, [user]);

  // Handle status update
  const handleStatus = async (id, title, description, status) => {
    try {
      setButtonIsLoading({
        status: true,
        button: "status",
        buttonId: id,
      });

      await updateTodo(id, title, description, status);
    } catch (error) {
      console.error("Error changing the status", error);
    } finally {
      setButtonIsLoading({ status: false, button: "", buttonId: "" });
    }
  };

  // Handle edit todo
  const handleEdit = (id) => {
    navigation.navigate("EditTodo", { todoId: id });
  };

  // Handle delete todo
  const handleDelete = async (id) => {
    try {
      setButtonIsLoading({
        status: true,
        button: "delete",
        buttonId: id,
      });
      await deleteTodo(id);
    } catch (error) {
      console.error("Error deleting the todo", error);
    } finally {
      setButtonIsLoading({ status: false, button: "", buttonId: "" });
    }
  };

  const navigateToAddTodo = () => {
    navigation.navigate("AddTodo");
  };

  return (
    <View style={styles.container}>
      <TodoListNavbar />
      {todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your list is empty</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {todos?.map((todo) => (
            <View key={todo._id} style={styles.todoContainer}>
              <Text style={styles.todoTitle}>{todo.title}</Text>
              <Text style={styles.todoDescription}>{todo.description}</Text>
              <View style={styles.buttonContainer}>
                {todo.status === "pending" ? (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      handleStatus(
                        todo._id,
                        todo.title,
                        todo.description,
                        "completed"
                      )
                    }
                  >
                    {buttonIsLoading.status &&
                    buttonIsLoading.button === "status" &&
                    buttonIsLoading.buttonId === todo._id ? (
                      <View style={styles.loadingContainer}>
                        <LoadingSpinner />
                      </View>
                    ) : (
                      <Image
                        source={require("../assets/svg/pending.png")}
                        style={styles.statusLogo}
                      />
                    )}
                  </TouchableOpacity>
                ) : (
                  <View style={styles.button}>
                    <Image
                      source={require("../assets/svg/done.png")}
                      style={styles.completedLogo}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleEdit(todo._id)}
                >
                  <Image
                    source={require("../assets/svg/edit.png")}
                    style={styles.editLogo}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDelete(todo._id)}
                >
                  {buttonIsLoading.status &&
                  buttonIsLoading.button === "delete" &&
                  buttonIsLoading.buttonId === todo._id ? (
                    <View style={styles.loadingContainer}>
                      <LoadingSpinner />
                    </View>
                  ) : (
                    <Image
                      source={require("../assets/svg/delete.png")}
                      style={styles.deleteLogo}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={navigateToAddTodo}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingTop: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.orange,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  todoContainer: {
    backgroundColor: colors.blueLight,
    margin: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
    borderRadius: 8,
    elevation: 2, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  todoDescription: {
    fontSize: 16,
    color: colors.darkGray,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  deleteLogo: {
    width: 20,
    height: 20,
    tintColor: "red",
  },
  editLogo: {
    width: 20,
    height: 20,
    tintColor: "black",
  },
  statusLogo: {
    width: 20,
    height: 20,
    tintColor: colors.yellow,
  },
  completedLogo: {
    width: 20,
    height: 20,
    tintColor: "green",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.orange,
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
  },
  floatingButtonText: {
    fontSize: 48,
    color: colors.blueLight,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 60,
  },
});

export default TodosScreen;
