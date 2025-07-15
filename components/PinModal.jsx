import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const PinModal = ({ visible, onClose, onConfirm }) => {
    const [pin, setPin] = useState('');
    const translateY = useRef(new Animated.Value(50)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
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
            setPin('');
        }
    }, [visible]);

    const handleSubmit = () => {
        if (pin.length === 4) {
            onConfirm(pin);
        }
    };

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
                    <Text className="text-3xl mb-3">🔐</Text>
                    <Text className="text-lg font-bold text-gray-800 mb-2">
                        Enter PIN to Confirm
                    </Text>

                    <TextInput
                        value={pin}
                        onChangeText={(val) => setPin(val.replace(/[^0-9]/g, '').slice(0, 4))}
                        keyboardType="numeric"
                        secureTextEntry
                        maxLength={4}
                        className="border border-gray-300 rounded-xl text-center w-32 py-2 text-xl font-bold tracking-widest text-gray-900"
                    />

                    <View className="flex-row space-x-3 mt-6">
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-gray-200 px-6 py-2 rounded-md"
                        >
                            <Text className="text-gray-800 font-semibold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            className="bg-green-600 px-6 py-2 rounded-md"
                        >
                            <Text className="text-white font-semibold">Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default PinModal;
