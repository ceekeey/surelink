import { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const InputAlert = ({ visible, onClose, message }) => {
    const translateY = useRef(new Animated.Value(50)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="none">
            <View className="flex-1 justify-center items-center bg-black/50">
                <Animated.View
                    style={{
                        transform: [{ translateY }],
                        opacity,
                    }}
                    className="bg-green-600 w-[85%] px-6 py-6 rounded-2xl items-center"
                >
                    <Text className="text-[48px] mb-1">⚠️</Text>

                    <Text className="text-white text-center text-base font-medium">
                        {message}
                    </Text>

                    <TouchableOpacity
                        className="mt-6 bg-white px-10 py-2.5 rounded-xl"
                        onPress={onClose}
                    >
                        <Text className="text-green-600 font-bold text-base">OK</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default InputAlert;
