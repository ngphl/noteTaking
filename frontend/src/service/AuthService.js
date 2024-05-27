// services/AuthService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SERVER_URL = "http://10.0.2.2:3000";

//Get token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    throw new Error("Fail to retrieve token");
  }
};

// Login service
export const login = async (username, password) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    await AsyncStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Logout service
export const logout = async () => {
    try{
        await  AsyncStorage.removeItem('token');
    }
    catch(error) {
        throw new Error('Failed to logout')
    }
};

//Register service
export const register = async (username, password) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
