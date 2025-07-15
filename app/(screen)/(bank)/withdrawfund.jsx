import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function withdrawfund() {
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState('');
    const [open, setOpen] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    // Replace with your live secret key
    const secretKey = 'sk_live_dcc2d172ab7c14c86101cb1811063a241fd72058'; // Use your live key in production

    // Fetch banks
    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await fetch('https://api.paystack.co/bank', {
                    headers: {
                        Authorization: `Bearer ${secretKey}`,
                    },
                });
                const json = await response.json();
                console.log(json)
                const formattedBanks = json.data.map((bank) => ({
                    label: bank.name,
                    value: bank.code,
                    icon: () => (
                        <Image
                            source={{
                                uri: `https://nigerianbanks.xyz/logo/${bank.slug}.png`,
                            }}
                            style={{ width: 20, height: 20, marginRight: 10, borderRadius: 4 }}
                        />
                    ),
                }));
                setBanks(formattedBanks);
            } catch (err) {
                Alert.alert('Error', 'Failed to load banks');
            }
        };

        fetchBanks();
    }, []);

    const verifyAccount = async () => {
        if (!accountNumber || !selectedBank) return;

        setLoading(true);
        try {
            const response = await fetch(
                `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${selectedBank}`,
                {
                    headers: {
                        Authorization: `Bearer ${secretKey}`,
                    },
                }
            );
            const data = await response.json();
            console.log('Account verification response:', data);

            if (data.status) {
                setAccountName(data.data.account_name);
            } else {
                Alert.alert('Error', data.message);
                setAccountName('');
            }
        } catch (err) {
            console.log('Error verifying account:', err);

            Alert.alert('Error', 'Could not verify account');
        } finally {
            setLoading(false);
        }
    };

    const handleTransferPress = () => {
        if (!selectedBank || !accountNumber || !amount || isNaN(amount) || Number(amount) <= 0) {
            Alert.alert('Missing fields', 'Please fill all fields correctly.');
            return;
        }

        if (!accountName) {
            Alert.alert('Verify Account', 'Please wait for account name verification.');
            return;
        }

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        router.push({
            pathname: '/confirmwithdraw',
            params: {
                amount,
                accountNumber,
                accountName,
                bank: banks.find((b) => b.value === selectedBank)?.label,
                note: note || '',
            },
        });
    };

    const FormContent = (
        <>
            <Text className="text-2xl font-bold text-primary text-center mb-6">Withdraw Funds</Text>

            <Text className="text-sm text-gray-700 mb-1">Select Bank</Text>
            <DropDownPicker
                open={open}
                value={selectedBank}
                items={banks}
                setOpen={setOpen}
                setValue={(callback) => {
                    const value = callback(selectedBank);
                    setSelectedBank(value);
                    setAccountName('');
                    Haptics.selectionAsync(); // haptic on bank select
                }}
                setItems={setBanks}
                placeholder="Choose your bank"
                onChangeValue={() => {
                    setAccountName('');
                }}
                style={{
                    borderColor: '#16a34a',
                    borderRadius: 12,
                    marginBottom: open ? 200 : 16,
                }}
                dropDownContainerStyle={{
                    borderColor: '#16a34a',
                    maxHeight: 250,
                }}
                listItemLabelStyle={{ marginLeft: 4 }}
                zIndex={1000}
                zIndexInverse={1000}
            />

            <Text className="text-sm text-gray-700 mb-1">Account Number</Text>
            <TextInput
                placeholder="Enter account number"
                value={accountNumber}
                onChangeText={(text) => {
                    setAccountNumber(text);
                    setAccountName('');
                }}
                onBlur={verifyAccount}
                keyboardType="numeric"
                className="border border-primary rounded-xl px-4 py-3 mb-2 text-base text-gray-900"
                placeholderTextColor="#9ca3af"
                maxLength={10}
            />

            <Text className="text-sm text-gray-700 mb-1">Amount</Text>
            <TextInput
                placeholder="Enter amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                className="border border-primary rounded-xl px-4 py-3 mb-4 text-base text-gray-900"
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
                className="bg-primary rounded-xl py-4 items-center"
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-bold text-base">Verify</Text>
                )}
            </TouchableOpacity>
        </>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                {open ? (
                    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40 }}>{FormContent}</View>
                ) : (
                    <ScrollView
                        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 40, paddingBottom: 60 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {FormContent}
                    </ScrollView>
                )}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
