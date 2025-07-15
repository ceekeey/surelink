import { StyleSheet } from "react-native";
import { Colors } from "../constant/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    height: 250,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subHeaderText: {
    color: "#fff",
    marginTop: 4,
  },
  formWrapper: {
    paddingHorizontal: 24,
    marginTop: -40,
  },
  formBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  inputWithIcon: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingRight: 40,
    marginBottom: 8,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
  },
  checkboxLabel: {
    color: "#555",
  },
  submitButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  footerLink: {
    color: "#16a34a",
    fontWeight: "600",
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  header: {
    height: 250,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: Colors.light,
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: Colors.light,
    marginTop: 4,
  },
  formContainer: {
    paddingHorizontal: 24,
    marginTop: -40,
    flex: 1,
  },
  form: {
    backgroundColor: Colors.light,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: "#111",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 4,
    fontSize: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.light,
    fontWeight: "bold",
    fontSize: 18,
  },
  signupText: {
    textAlign: "center",
    marginTop: 16,
    color: "#6b7280",
  },
  signupLink: {
    color: "#16a34a",
    fontWeight: "bold",
  },
});
