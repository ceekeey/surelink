import NetInfo from "@react-native-community/netinfo";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    if (loading) return; // prevent spam taps

    email = email.trim();
    password = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email)
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Email Is Required",
      });

    if (!emailRegex.test(email))
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter Valid Email",
      });

    if (!password)
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password Is Required",
      });

    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "No internet connection. Please check your network.",
      });
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL_REAL}/login.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log("Login Response:", data);

      if (!data.status || data.message !== "Login successful") {
        throw new Error(data.message);
      }

      const userObj = {
        id: data?.user?.id,
        fullName: data?.user?.full_name,
        email: data?.user?.email,
        phone: data?.user?.phone,
        verified: true,
        wallet_balance: data?.user?.wallet_balance,
      };

      await loginUser(userObj, true);
      router.replace("/home");
    } catch (err) {
      console.log("Login Error:", err.message);
      if (err.message.toLowerCase().includes("network")) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Unable to connect. Please try again.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
  };
};
