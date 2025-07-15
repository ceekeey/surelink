import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native';

const SuccessModal = ({ visible, onClose, amount, reference, redirect, note, recipient, type, bank, accountNumber }) => {
    const translateY = useRef(new Animated.Value(50)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const animationRef = useRef(null);

    useEffect(() => {
        if (visible) {
            animationRef.current?.play();
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            translateY.setValue(50);
            opacity.setValue(0);
        }
    }, [visible]);

    const printRecipt = () => {
        router.push({
            pathname: redirect,
            params: {
                amount: amount,
                recipient: recipient,
                note: note,
                reference: reference,
                type: type,
                accountNumber: accountNumber || "",
                bank: bank || ""
            }
        })
    }

    return (
        <Modal transparent visible={visible} animationType="none">
            <View className="flex-1 justify-center items-center bg-black/50 px-6">
                <Animated.View
                    style={{
                        transform: [{ translateY }],
                        opacity,
                    }}
                    className="bg-white w-full max-w-md rounded-2xl px-6 py-8 items-center shadow-md"
                >
                    <LottieView
                        ref={animationRef}
                        source={require('../assets/lottie/success.json')}
                        autoPlay
                        loop={false}
                        style={{ width: 150, height: 150 }}
                    />

                    <Text className="text-xl font-bold text-green-600 mt-2 mb-1">
                        Transfer Successful!
                    </Text>

                    <Text className="text-center text-gray-700 mb-2">
                        ₦{amount} sent successfully
                    </Text>

                    <Text className="text-sm text-gray-500 mb-4">Ref: {reference}</Text>

                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-green-600 px-6 py-3 rounded-xl"
                    >
                        <Text onPress={printRecipt} className="text-white font-bold text-base">Done</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default SuccessModal;
