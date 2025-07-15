import { useEffect, useRef } from 'react';
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native';

const ConfirmModal = ({ visible, onClose, onConfirm }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        } else {
            scaleAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/50 justify-center items-center">
                <Animated.View
                    style={{ transform: [{ scale: scaleAnim }] }}
                    className="w-4/5 bg-white p-5 rounded-xl items-center shadow-md"
                >
                    <Text className="text-lg font-bold mb-2 text-gray-900">Are you sure?</Text>
                    <Text className="text-sm text-gray-600 mb-4 text-center">Do you really want to logout?</Text>

                    <View className="flex-row space-x-3">
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-gray-100 px-5 py-2 rounded-md"
                        >
                            <Text className="text-gray-900 font-bold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onConfirm}
                            className="bg-red-600 px-5 py-2 rounded-md"
                        >
                            <Text className="text-white font-bold">Logout</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default ConfirmModal;
