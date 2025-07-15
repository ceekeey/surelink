import NetInfo from '@react-native-community/netinfo';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const isEmailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const shake = useSharedValue(0);

    const handleForgotPassword = async () => {
        if (!isEmailValid) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            shake.value = withSpring(10, {}, () => (shake.value = withSpring(0)));
            return Toast.show({
                type: "error",
                text1: "Error",
                text2: 'Please enter a valid email address.',
            });
        }

        try {
            const netInfo = await NetInfo.fetch();
            if (!netInfo.isConnected) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                return Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: 'No internet connection.',
                });
            }

            setLoading(true);
            Keyboard.dismiss();
            Haptics.selectionAsync();

            const res = await fetch('https://softcrest.com.ng/surelink/api/request_password_reset.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await res.json();
            console.log('Forgot Password Response:', data);
            if (data.status && data.message === 'OTP sent to email.') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                router.replace('resetpassword');
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (err) {
            return Toast.show({
                type: "error",
                text1: "Error",
                text2: err.message || 'Error sending reset link',
            });
        } finally {
            setLoading(false);
        }
    };

    const animatedShakeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shake.value }],
    }));

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-white"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="bg-green-600 rounded-b-3xl" style={{ paddingBottom: hp(20) }} />

                        <Animated.View entering={FadeInUp.duration(500)} className="items-center py-4">
                            <Text className="text-green-600" style={{ fontSize: widthPercentageToDP(8) }}>
                                Forgot Password
                            </Text>
                            <Text className="text-green-600 text-center mt-1" style={{ fontSize: widthPercentageToDP(4) }}>
                                Enter your email to receive a reset link.
                            </Text>
                        </Animated.View>

                        <Animated.View
                            entering={FadeInUp.delay(100).duration(500)}
                            className="px-8 pt-10"
                            style={animatedShakeStyle}
                        >
                            <Text className="text-base mb-2">Email</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg px-4 py-3 text-base mb-6"
                                placeholder="Enter Email"
                                keyboardType="email-address"
                                returnKeyType="done"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TouchableOpacity
                                onPress={handleForgotPassword}
                                disabled={!isEmailValid || loading}
                                className={`rounded-lg py-4 items-center mb-6 ${!isEmailValid || loading ? 'bg-gray-400' : 'bg-green-600'
                                    }`}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text className="text-white font-semibold text-base">Send Reset Link</Text>
                                )}
                            </TouchableOpacity>
                        </Animated.View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default ForgotPassword;