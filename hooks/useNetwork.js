import NetInfo from "@react-native-community/netinfo";

export const netState = await NetInfo.fetch();
if (!netState.isConnected) {
  return Toast.show({
    type: "error",
    text1: "Error",
    text2: "No internet connection. Please check your network.",
  });
}
