import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useRegister } from '../../hooks/useRegister';

import Animated, {
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const Register = () => {
    const { user } = useAuth();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPin, setShowPin] = useState(false);

    const {
        handleRegister,
        loading,
    } = useRegister();

    const isFormValid =
        email.trim() !== '' &&
        phone.trim() !== '' &&
        password.trim() !== '' &&
        pin.trim().length === 4;

    useEffect(() => {
        if (user && user.verified) {
            router.replace('/home');
        }
    }, [user]);

    // Animation logic
    const shakeX = useSharedValue(0);
    const scale = useSharedValue(1);

    const shakeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shakeX.value }],
    }));

    const scaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const shake = () => {
        shakeX.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withTiming(10, { duration: 100 }),
            withTiming(-6, { duration: 100 }),
            withTiming(0, { duration: 50 })
        );
    };

    const handleSubmit = async () => {
        Keyboard.dismiss();
        if (!isFormValid) {
            shake();
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            return;
        }

        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        handleRegister({ fullName, email, phone, password, pin });
    };

    const togglePassword = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowPassword(!showPassword);
    };

    const togglePin = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowPin(!showPin);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            extraHeight={100}
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: 'white' }}
        >
            <SafeAreaView edges={['bottom']}>
                <View
                    className="bg-green-600 flex-1 mb-6 rounded-b-3xl"
                    style={{ paddingBottom: hp(20) }}
                />

                <View className="py-2 flex justify-center items-center">
                    <Text
                        className="text-green-600"
                        style={{ fontSize: widthPercentageToDP(8) }}
                    >
                        Create Account
                    </Text>
                    <Text
                        className="text-green-600"
                        style={{ fontSize: widthPercentageToDP(5) }}
                    >
                        Sign up to get started
                    </Text>
                </View>

                <Animated.View
                    entering={FadeInUp.duration(600)}
                    style={shakeStyle}
                    className="flex-1 px-8 pt-10"
                >
                    {/* name */}
                    <Text className="text-base mb-2">Name</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base mb-4"
                        placeholder="Enter Name"
                        value={fullName}
                        onChangeText={setFullName}
                        autoCapitalize="none"
                    />

                    {/* email */}
                    <Text className="text-base mb-2">Email</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base mb-4"
                        placeholder="Enter Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    {/* phone */}
                    <Text className="text-base mb-2">Phone Number</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base mb-4"
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />

                    {/* password */}
                    <Text className="text-base mb-2">Password</Text>
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
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={22}
                                color="#6b7280"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* pin */}
                    <Text className="text-base mb-2">4-Digit PIN</Text>
                    <View className="relative mb-8">
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-3 pr-12 text-base"
                            placeholder="Enter 4-digit PIN"
                            keyboardType="number-pad"
                            maxLength={4}
                            secureTextEntry={!showPin}
                            value={pin}
                            onChangeText={setPin}
                        />
                        <TouchableOpacity
                            onPress={togglePin}
                            className="absolute right-4 top-3"
                        >
                            <Ionicons
                                name={showPin ? 'eye-off-outline' : 'eye-outline'}
                                size={22}
                                color="#6b7280"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* animated register btn */}
                    <TouchableWithoutFeedback
                        onPressIn={() => (scale.value = withSpring(0.96))}
                        onPressOut={() => (scale.value = withSpring(1))}
                        onPress={handleSubmit}
                    >
                        <Animated.View
                            style={scaleStyle}
                            className={`rounded-lg py-4 items-center mb-6 ${!isFormValid || loading ? 'bg-gray-400' : 'bg-primary'
                                }`}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" className="text-green-600" />
                            ) : (
                                <Text className="text-white text-base font-semibold">
                                    Register
                                </Text>
                            )}
                        </Animated.View>
                    </TouchableWithoutFeedback>

                    <Text className="text-sm text-center mb-2">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-medium">
                            Sign In
                        </Link>
                    </Text>
                </Animated.View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

export default Register;