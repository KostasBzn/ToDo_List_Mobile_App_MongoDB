import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";
import axios from "../config/axios.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [operationStatus, setOperationStatus] = useState({
    success: false,
    message: "",
    type: "",
  });
  const [error, setError] = useState(null);

  const baseURL = BASE_URL;

  // Sign in
  const signIn = async (email, password) => {
    const body = { email, password };
    //
    try {
      const response = await axios.post(`${baseURL}/users/login`, body);

      if (response.data.success) {
        setUser(response.data.user);
        setOperationStatus({
          success: true,
          message: "User signed in successfully",
          type: "signIn",
        });

        await AsyncStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error signing in user", error);
    }
  };

  // Sign up
  const signUp = async (name, email, password) => {
    const body = { name, email, password };

    try {
      const response = await axios.post(`${baseURL}/users/register`, body);
      if (response.data.success) {
        setOperationStatus({
          success: true,
          message: "User signed up successfully",
          type: "signUp",
        });
      }
    } catch (error) {
      setError(error.message);
      console.error("Error signing up user", error);
    }
  };

  // Logged user
  const loggedUser = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (token) {
        const response = await axios.get(`${baseURL}/users/logged`);

        if (response.data.success) {
          setUser(response.data.user);
        }
      }
    } catch (error) {
      console.error("Error logging user", error);
      await AsyncStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    loggedUser();
  }, []);

  //logout user
  const logoutUser = async () => {
    await AsyncStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        operationStatus,
        setOperationStatus,
        error,
        signIn,
        signUp,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
