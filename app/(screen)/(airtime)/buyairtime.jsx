import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Image,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import airtelLogo from '../../../assets/networks/airtel.png';
import etisalatLogo from '../../../assets/networks/etisalat.png';
import gloLogo from '../../../assets/networks/glo.png';
import mtnLogo from '../../../assets/networks/mtn.png';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const networks = [
    { id: 'mtn', icon: mtnLogo },
    { id: 'airtel', icon: airtelLogo },
    { id: 'glo', icon: gloLogo },
    { id: 'etisalat', icon: etisalatLogo },
];

const BuyAirtime = () => {
    const [selectedNetwork, setSelectedNetwork] = useState(null);
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [isValidNumber, setIsValidNumber] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    useEffect(() => {
        validatePhone(phone);
    }, [phone]);

    const validatePhone = (number) => {
        const regex = /^(?:\+234|0)[789][01]\d{8}$/;
        const valid = regex.test(number.replace(/\s/g, ''));
        setIsValidNumber(valid);
    };

    const isFormValid = selectedNetwork && phone && amount && isValidNumber;

    const handleBackHome = () => {
        if (!isFormValid) {
            Toast.show({
                type: 'error',
                text1: 'Form incomplete',
                text2: 'Please select a network and enter valid info',
            });
            return;
        }

        Toast.show({
            type: 'success',
            text1: 'Airtime sent!',
            text2: `₦${amount} sent to ${phone}`,
        });

        // router.replace('/home');
    };

    const buttonTranslateY = useSharedValue(0);

    useEffect(() => {
        buttonTranslateY.value = withTiming(keyboardVisible ? -40 : 0, { duration: 300 });
    }, [keyboardVisible]);

    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: buttonTranslateY.value }],
    }));

    return (
        <SafeAreaView className="bg-white flex-1">
            <KeyboardAwareScrollView
                className="px-5"
                enableOnAndroid
                extraScrollHeight={100}
                keyboardShouldPersistTaps="handled"
            >
                {/* TOP NAV */}
                <View className="flex-row items-center mt-4 mb-6">
                    <Pressable onPress={() => router.back()} className="mr-3">
                        <Ionicons name="arrow-back" size={24} color="#111" />
                    </Pressable>
                    <Text className="text-xl font-semibold text-gray-800">Buy Airtime</Text>
                </View>

                {/* NETWORK SELECTION */}
                <View className="w-full rounded-xl p-4 mb-6">
                    <View className="flex-row justify-between mb-5">
                        {networks.map((network) => {
                            const isSelected = selectedNetwork === network.id;
                            const scale = useSharedValue(isSelected ? 1.1 : 1);

                            useEffect(() => {
                                scale.value = withTiming(isSelected ? 1.1 : 1, { duration: 200 });
                            }, [isSelected]);

                            const animatedStyle = useAnimatedStyle(() => ({
                                transform: [{ scale: scale.value }],
                            }));

                            return (
                                <TouchableOpacity
                                    key={network.id}
                                    onPress={() => setSelectedNetwork(network.id)}
                                    activeOpacity={0.9}
                                >
                                    <Animated.View
                                        style={[
                                            {
                                                padding: 5,
                                                borderRadius: 10,
                                                backgroundColor: isSelected ? '#D1FADF' : '#F3F4F6',
                                            },
                                            animatedStyle,
                                        ]}
                                    >
                                        <Image
                                            source={network.icon}
                                            style={{
                                                width: widthPercentageToDP(15),
                                                height: heightPercentageToDP(10),
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </Animated.View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* PHONE INPUT */}
                    <Text className="text-gray-600 font-semibold mb-1">Mobile Number</Text>
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        className={`border rounded-md p-3 bg-white ${isValidNumber ? 'border-green-400' : 'border-red-500'
                            }`}
                        placeholder="+2348012345678"
                    />
                    {!isValidNumber && phone.length > 0 && (
                        <Text className="text-red-500 mt-1 text-sm">Invalid Nigerian mobile number</Text>
                    )}

                    {/* AMOUNT INPUT */}
                    <Text className="text-gray-600 font-semibold mb-1 mt-4">Amount</Text>
                    <TextInput
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="number-pad"
                        className="border border-green-400 rounded-md p-3 bg-white"
                        placeholder="₦1000"
                    />
                </View>
            </KeyboardAwareScrollView>

            {/* SUBMIT BUTTON */}
            <Animated.View style={[animatedButtonStyle, { paddingHorizontal: 20 }]}>
                <TouchableOpacity
                    onPress={handleBackHome}
                    className={`rounded-xl w-full py-4 mb-5 ${isFormValid ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                    activeOpacity={isFormValid ? 0.8 : 1}
                    disabled={!isFormValid}
                >
                    <Text className="text-white font-bold text-center text-lg">
                        {isFormValid ? 'Buy Airtime' : 'Fill All Fields'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        Toast.show({
                            type: 'success',
                            text1: 'Hello 👋',
                            text2: 'This is a toast test!',
                        })
                    }
                >
                    <Text>Show Toast</Text>
                </TouchableOpacity>

            </Animated.View>
        </SafeAreaView>
    );
};

export default BuyAirtime;
