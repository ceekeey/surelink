import { Stack } from "expo-router";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Platform, StatusBar } from "react-native";
import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "#16a34a" }}
            edges={['top', 'left', 'right', 'bottom']}
          >
            {Platform.OS === 'android' && (
              <StatusBar backgroundColor="#16a34a" barStyle="light-content" translucent={false} />
            )}
            {Platform.OS === 'ios' && <ExpoStatusBar style="light" />}

            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>

          {/* ✅ Place Toast outside SafeAreaView so it's not clipped */}
          <Toast />
        </>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
