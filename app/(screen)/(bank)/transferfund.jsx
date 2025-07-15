import { router } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function transferfund() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTransferPress = () => {
        if (!recipient || !amount || isNaN(amount) || Number(amount) <= 0) {
            Alert.alert('Invalid Input', 'Please enter recipient and a valid amount.');
            return;
        }

        router.push({
            pathname: '/confirmtransfer',
            params: {
                amount,
                recipient,
                note: note || '',
            }
        });
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 40 }}
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: 'white' }}
        >
            <View>
                <Text className="text-2xl font-bold text-green-600 text-center mb-6">
                    Make a Transfer
                </Text>

                <Text className="text-sm text-gray-700 mb-1">Recipient</Text>
                <TextInput
                    placeholder="Enter username or account"
                    value={recipient}
                    onChangeText={setRecipient}
                    className="border border-green-600 rounded-xl px-4 py-3 mb-4 text-base text-gray-900"
                    placeholderTextColor="#9ca3af"
                />

                <Text className="text-sm text-gray-700 mb-1">Amount</Text>
                <TextInput
                    placeholder="Enter amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    className="border border-green-600 rounded-xl px-4 py-3 mb-4 text-base text-gray-900"
                    placeholderTextColor="#9ca3af"
                />

                <Text className="text-sm text-gray-700 mb-1">Note (optional)</Text>
                <TextInput
                    placeholder="Message or purpose"
                    value={note}
                    onChangeText={setNote}
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base text-gray-800"
                    placeholderTextColor="#9ca3af"
                />

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
            </View>
        </KeyboardAwareScrollView>
    );
}
