import NetInfo from "@react-native-community/netinfo";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";

export const useRegister = () => {
  const { registerUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegister = async ({ fullName, email, phone, password, pin }) => {
    // Trim and sanitize inputs
    email = email.trim().toLowerCase();
    phone = phone.trim();
    password = password.trim();
    pin = pin.trim();

    // Basic validation
    if (!fullName || !email || !phone || !password || !pin) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "PPlease enter a valid email address",
      });
    }

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "PIN must be 4 numeric digits",
      });
    }

    // Check internet connection
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "No internet connection. Please check your network.",
      });
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL_REAL}/register.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName,
            email,
            phone,
            password,
            pin,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok || data.status === false) {
        throw new Error(data.message || "Registration failed");
      }

      await registerUser({ email, verified: false });
      router.push("/verify");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    loading,
  };
};
