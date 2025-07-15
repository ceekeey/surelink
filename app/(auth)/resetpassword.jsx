import NetInfo from "@react-native-community/netinfo";
import { router } from "expo-router";
import { useEffect, useRef, useState } from 'react';
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
    UIManager,
    View
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";

UIManager.setLayoutAnimationEnabledExperimental?.(true);

const resetpassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const inputRefs = useRef([]);
    const shakeX = useSharedValue(0);
    const submitScale = useSharedValue(1);

    const inputScales = [0, 1, 2].map(() => useSharedValue(1));

    const shakeAnim = useAnimatedStyle(() => ({
        transform: [{ translateX: shakeX.value }],
    }));

    const submitAnim = useAnimatedStyle(() => ({
        transform: [{ scale: submitScale.value }],
    }));

    useEffect(() => {
        Toast.show({
            type: "success",
            text1: "Success",
            text2: 'Otp Sent To Your Email',
        });
    }, []);

    const handleResetPassword = async () => {
        if (!password || !email || !otp) {
            shakeX.value = withSequence(
                withTiming(-10, { duration: 50 }),
                withTiming(10, { duration: 50 }),
                withTiming(-10, { duration: 50 }),
                withTiming(10, { duration: 50 }),
                withTiming(0, { duration: 50 })
            );
            return Toast.show({
                type: "error",
                text1: "Error",
                text2: 'All Fields Are Required',
            });
        }

        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
            return Toast.show({
                type: "error",
                text1: "Error",
                text2: 'No internet connection. Please check your network.',
            });

        }

        setLoading(true);
        try {
            const res = await fetch(process.env.EXPO_PUBLIC_API_URL_REAL + 'reset_password.php', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ new_password: password, otp, email })
            });
            const data = await res.json();
            if (!data.status) throw new Error(data.message);
            router.push('login');
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-white"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView edges={['bottom']}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                        <View className="flex-1 mb-6 rounded-b-3xl" style={{ paddingBottom: hp(10) }} />

                        <View className="py-2 flex justify-center items-center">
                            <Text className="text-green-600 my-2" style={{ fontSize: widthPercentageToDP(8) }}>
                                Reset Password
                            </Text>
                            <Text className="text-green-600" style={{ fontSize: widthPercentageToDP(4) }}>
                                Enter your new password below.
                            </Text>
                        </View>

                        <Animated.View style={shakeAnim} className="flex-1 px-8 pt-10 space-y-4">
                            {[email, otp, password].map((val, idx) => {
                                const scaleStyle = useAnimatedStyle(() => ({
                                    transform: [{ scale: inputScales[idx].value }]
                                }));

                                const placeholders = ["Enter Email", "Enter 6-digit OTP", "New Password"];
                                const isPassword = idx === 2;

                                return (
                                    <Animated.View key={idx} style={scaleStyle}>
                                        <TextInput
                                            ref={(ref) => (inputRefs.current[idx] = ref)}
                                            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                                            placeholder={placeholders[idx]}
                                            placeholderTextColor="#888"
                                            keyboardType={idx === 1 ? 'number-pad' : 'email-address'}
                                            maxLength={idx === 1 ? 6 : undefined}
                                            secureTextEntry={isPassword}
                                            value={val}
                                            onChangeText={(text) => {
                                                if (idx === 0) setEmail(text);
                                                if (idx === 1) setOtp(text);
                                                if (idx === 2) setPassword(text);
                                            }}
                                            onFocus={() => (inputScales[idx].value = withSpring(1.05))}
                                            onBlur={() => (inputScales[idx].value = withSpring(1))}
                                        />
                                    </Animated.View>
                                );
                            })}

                            <Animated.View style={submitAnim}>
                                <TouchableOpacity
                                    onPressIn={() => (submitScale.value = withSpring(0.95))}
                                    onPressOut={() => (submitScale.value = withSpring(1))}
                                    onPress={handleResetPassword}
                                    disabled={loading}
                                    className={`rounded-lg py-4 items-center mb-6 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
                                >
                                    {loading ? (
                                        <ActivityIndicator size="small" className="text-green-600" />
                                    ) : (
                                        <Text className="text-white text-base font-semibold">Reset Password</Text>
                                    )}
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.View>

                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default resetpassword;