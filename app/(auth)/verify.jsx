import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';

const VerifyOtp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [timer, setTimer] = useState(30);
    const inputs = useRef([]);
    const { user } = useAuth();

    const inputScales = Array(6).fill().map(() => useSharedValue(1));
    const shakeX = useSharedValue(0);
    const verifyScale = useSharedValue(1);

    const shakeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shakeX.value }],
    }));

    const verifyAnim = useAnimatedStyle(() => ({
        transform: [{ scale: verifyScale.value }],
    }));

    useEffect(() => {
        inputs.current[0]?.focus();
    }, []);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (text, index) => {
        if (/^\d+$/.test(text)) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            let newOtp = [...otp];

            if (text.length === 6) {
                newOtp = text.slice(0, 6).split('');
                setOtp(newOtp);
                inputs.current[5]?.blur();
                autoSubmit(newOtp);
                return;
            }

            newOtp[index] = text[0];
            setOtp(newOtp);

            if (index < 5) {
                inputs.current[index + 1]?.focus();
            } else {
                Keyboard.dismiss();
                autoSubmit(newOtp);
            }
        } else if (text === '') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }
    };

    const autoSubmit = async (codeArr) => {
        const code = codeArr.join('');
        if (code.length === 6) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            await verifyOtp(code);
        }
    };

    const verifyOtp = async (code) => {
        const enteredOtp = code || otp.join('');
        if (enteredOtp.length < 6) {
            shakeX.value = withSequence(
                withTiming(-10, { duration: 50 }),
                withTiming(10, { duration: 50 }),
                withTiming(-10, { duration: 50 }),
                withTiming(10, { duration: 50 }),
                withTiming(0, { duration: 50 })
            );
            Toast.show({
                type: "error",
                text1: "Error",
                text2: 'Please enter 6-digit code',
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(process.env.EXPO_PUBLIC_API_URL_REAL + '/verify_otp.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, otp: enteredOtp }),
            });
            const data = await res.json();

            if (!res.ok || data.status === false) {
                throw new Error(data.message || "Verification failed");
            }

            if (data?.message) {
                Toast.show({
                    type: "success",
                    text1: "success",
                    text2: "Verified successfully!",
                });
                setTimeout(() => router.replace('/(auth)/login'), 1000);
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async () => {
        setLoading(true);
        try {
            const res = await fetch(process.env.EXPO_PUBLIC_API_URL_REAL + '/resend_otp.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email }),
            });
            const data = await res.json();

            if (!data.status || data.message) {
                throw new Error(data.message);
            }

            if (data?.sucess && data?.message === "OTP resent to your email") {
                Toast.show({
                    type: "success",
                    text1: "Error",
                    text2: "Otp Send To You Email",
                });
                setOtp(['', '', '', '', '', '']);
                inputs.current[0]?.focus();
                setTimer(30);
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center bg-white px-6 py-8">
            <StatusBar barStyle="dark-content" />
            <View className="bg-white rounded-2xl p-5 items-center justify-center shadow-md">
                <Text className="text-2xl font-bold text-green-600 mb-1">Verify OTP</Text>
                <Text className="text-gray-500 text-center mb-6">
                    Enter the 6-digit code sent to your email
                </Text>

                <Animated.View style={[shakeStyle]} className="flex-row justify-center items-center mb-6">
                    {otp.map((digit, idx) => {
                        const scaleStyle = useAnimatedStyle(() => ({
                            transform: [{ scale: inputScales[idx].value }],
                        }));

                        return (
                            <Animated.View key={idx} style={scaleStyle}>
                                <TextInput
                                    ref={(ref) => (inputs.current[idx] = ref)}
                                    value={digit}
                                    onChangeText={(text) => handleChange(text, idx)}
                                    onKeyPress={(e) => handleKeyPress(e, idx)}
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    onFocus={() => {
                                        setActiveIndex(idx);
                                        inputScales[idx].value = withSpring(1.1);
                                    }}
                                    onBlur={() => {
                                        setActiveIndex(null);
                                        inputScales[idx].value = withSpring(1);
                                    }}
                                    className={`mx-1 w-9 h-12 text-lg text-center rounded-lg border ${activeIndex === idx
                                        ? 'border-2 border-green-600 shadow-sm scale-105'
                                        : 'border-gray-300'
                                        } text-gray-700 bg-white`}
                                    selectionColor="#16a34a"
                                    editable={!loading}
                                />
                            </Animated.View>
                        );
                    })}
                </Animated.View>

                <Animated.View style={verifyAnim}>
                    <TouchableOpacity
                        onPressIn={() => (verifyScale.value = withSpring(0.96))}
                        onPressOut={() => (verifyScale.value = withSpring(1))}
                        onPress={() => verifyOtp()}
                        className={`rounded-full px-14 py-3 ${loading || otp.join('').length < 6
                            ? 'bg-green-600 opacity-60'
                            : 'bg-green-600'
                            }`}
                        activeOpacity={0.8}
                        disabled={loading || otp.join('').length < 6}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text className="text-white text-lg font-semibold">Verify</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>

                {timer > 0 ? (
                    <Text className="mt-4 text-gray-500">Resend OTP in {timer}s</Text>
                ) : (
                    <TouchableOpacity
                        onPress={resendOtp}
                        className={`${loading ? 'opacity-60' : ''} mt-4`}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#16a34a" />
                        ) : (
                            <Text className="text-green-600 font-medium underline">
                                Resend OTP
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default VerifyOtp;