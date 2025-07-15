import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

export const verifyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  otpInput: {
    marginHorizontal: 5,
    width: 36,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    color: "#374151",
  },
  activeOtpInput: {
    borderColor: Colors.primary,
    borderWidth: 2,
    transform: [{ scale: 1.05 }],
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  verifyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 50,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  resendButton: {
    marginTop: 16,
  },
  resendText: {
    color: Colors.primary,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  disabledButton: {
    opacity: 0.6, // Visual feedback for disabled state
  },
});
