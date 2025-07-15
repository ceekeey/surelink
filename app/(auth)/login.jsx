import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogin } from '../../hooks/useLogin';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {
        loading,
        handleLogin,
    } = useLogin();

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    // animations
    const shakeX = useSharedValue(0);
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const fadeIn = useSharedValue(0);

    const shakeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shakeX.value }],
    }));

    const scaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const rotateStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const fadeStyle = useAnimatedStyle(() => ({
        opacity: fadeIn.value,
    }));

    const triggerShake = () => {
        shakeX.value = withSpring(-10, {}, () => {
            shakeX.value = withSpring(10, {}, () => {
                shakeX.value = withSpring(-10, {}, () => {
                    shakeX.value = withSpring(0);
                });
            });
        });
    };

    const handleSubmit = async () => {
        if (!isFormValid) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            triggerShake();
            return;
        }

        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Keyboard.dismiss()
        handleLogin(email, password);
    };

    const togglePassword = () => {
        rotation.value = withSpring(rotation.value + 180);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        fadeIn.value = withSpring(1);
    }, []);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: 'white' }}
        >
            <SafeAreaView edges={['bottom']}>
                <Animated.View style={fadeStyle}>
                    <View className="bg-green-600 flex-1 mb-6 rounded-b-3xl" style={{ paddingBottom: hp(15) }} />

                    <View className="py-2 flex justify-center items-center">
                        <Text className="text-green-600" style={{ fontSize: widthPercentageToDP(8) }}>Welcome Back</Text>
                        <Text className="text-green-600" style={{ fontSize: widthPercentageToDP(5) }}>Login to continue</Text>
                    </View>

                    <View className="flex-1 px-8 pt-10">
                        {/* email  */}
                        <Text className="text-base mb-2">Email</Text>
                        <Animated.View style={shakeStyle}>
                            <TextInput
                                className="border border-gray-300 rounded-lg px-4 py-3 text-base mb-4"
                                placeholder="Enter Email"
                                keyboardType="email-address"
                                returnKeyType="next"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />
                        </Animated.View>

                        {/* password */}
                        <Text className="text-base mb-2">Password</Text>
                        <Animated.View style={shakeStyle}>
                            <View className="relative mb-8">
                                <TextInput
                                    className="border border-gray-300 rounded-lg px-4 py-3 pr-12 text-base"
                                    placeholder="Enter password"
                                    secureTextEntry={!showPassword}
                                    returnKeyType="done"
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity
                                    onPress={togglePassword}
                                    className="absolute right-4 top-3"
                                >
                                    <Animated.View style={rotateStyle}>
                                        <Ionicons
                                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                            size={22}
                                            color="#6b7280"
                                        />
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>

                        {/* login btn  */}
                        <Animated.View style={scaleStyle}>
                            <TouchableOpacity
                                onPressIn={() => (scale.value = withSpring(0.95))}
                                onPressOut={() => (scale.value = withSpring(1))}
                                onPress={handleSubmit}
                                disabled={!isFormValid || loading}
                                className={`rounded-lg py-4 items-center mb-6 ${!isFormValid || loading ? 'bg-gray-400' : 'bg-primary'}`}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" className="text-green-600" />
                                ) : (
                                    <Text className="text-white text-base font-semibold">Login</Text>
                                )}
                            </TouchableOpacity>
                        </Animated.View>

                        <Text className="text-sm text-center mb-2">
                            Don’t have an account?{' '}
                            <Link href="register" className="text-primary font-medium">
                                Sign Up
                            </Link>
                        </Text>

                        <Text className="text-sm text-center">
                            <Link href="forgotpassword" className="text-primary font-medium">
                                Forgot Password?
                            </Link>
                        </Text>
                    </View>
                </Animated.View>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

export default Login;