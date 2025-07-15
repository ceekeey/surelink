import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PinModel from '../../../components/PinModal';
import SuccessModal from '../../../components/SuccessModel';
import { useAuth } from '../../../context/AuthContext';

const confirmtransfer = () => {
    const { amount, recipient, note } = useLocalSearchParams()
    const [showPin, setShowPin] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.replace('/(auth)/login');
        }
    }, [user]);

    if (!user) return null;

    const handleTransferPress = () => {
        Keyboard.dismiss();

        if (!recipient || !amount || isNaN(amount) || Number(amount) <= 0) {
            Alert.alert('Invalid Input', 'Please enter recipient and a valid amount.');
            return;
        }
        setShowPin(true);
    };

    const handlePinConfirm = (enteredPin) => {
        // You can use the `enteredPin` to validate user PIN here
        setShowPin(false);
        setLoading(true);

        // Simulate transfer
        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);
        }, 1500);
    };
    return (
        <SafeAreaView className="flex-1 bg-white px-5 pt-6">
            <View className="items-center mb-6">
                <Image
                    source={require('../../../assets/images/user.png')}
                    className="w-24 h-24 rounded-full mb-2"
                />
                <Text className="text-xl font-bold text-gray-900">{recipient}</Text>
                <Text className="text-xl font-bold text-gray-900">{amount}</Text>
                <Text className="text-xl font-bold text-gray-900">{note}</Text>
            </View>
            <TouchableOpacity
                onPress={handleTransferPress}
                disabled={loading}
                className="bg-green-600 rounded-xl py-4 items-center"
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-bold text-base">Transfer Now</Text>
                )}
            </TouchableOpacity>

            {/* PIN Modal */}
            <PinModel
                visible={showPin}
                onClose={() => setShowPin(false)}
                onConfirm={handlePinConfirm}
            />

            {/* Success Modal */}
            <SuccessModal
                visible={showSuccess}
                onClose={() => setShowSuccess(false)}
                amount={amount}
                recipient={recipient}
                note={note}
                reference={`TRANS-${Date.now()}`}
                redirect={'reciptprint'}
                type={'transfer'}
            />
        </SafeAreaView>


    )
}

export default confirmtransfer