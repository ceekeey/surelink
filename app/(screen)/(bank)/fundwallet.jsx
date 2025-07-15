import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Paystack } from 'react-native-paystack-webview';
import SuccessModal from '../../../components/SuccessModel';
import { useAuth } from '../../../context/AuthContext';

export default function fundwallet() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [amount, setAmount] = useState('');
    const [showPaystack, setShowPaystack] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showChargeNotice, setShowChargeNotice] = useState(false);

    const { user } = useAuth();
    const PAY_STACK_PUBLIC_KEY = 'pk_test_21968278445fc6144782604bbbe0a1fbc8c4093b';

    const handlePaymentPress = () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount');
            return;
        }

        setShowChargeNotice(true);
    };

    const handleSuccess = (response) => {
        const reference =
            response.data?.reference || response.transactionRef?.reference;


        setPaymentDetails({
            email: user.email,
            amount,
            reference,
        });

        setShowPaystack(false);
        setShowSuccess(true);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraHeight={100}
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: 'white', paddingHorizontal: 24 }}
        >
            <View className="flex-1 justify-center">
                <Text className="text-2xl font-bold text-green-600 text-center mb-8">
                    Fund Wallet
                </Text>

                <TextInput
                    placeholder="Enter Amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholderTextColor="#9ca3af"
                    className="border border-green-600 rounded-lg py-3 px-4 text-base text-gray-900 mb-4"
                />

                <TouchableOpacity
                    onPress={handlePaymentPress}
                    activeOpacity={0.8}
                    disabled={loading}
                    className="bg-green-600 py-3.5 rounded-lg items-center mt-2"
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-lg font-semibold">Pay Now</Text>
                    )}
                </TouchableOpacity>

                {/* ⚠️ Paystack Charge Modal */}
                <Modal
                    visible={showChargeNotice}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowChargeNotice(false)}
                >
                    <View className="flex-1 bg-black/40 justify-center items-center px-6">
                        <View className="bg-white p-6 rounded-2xl w-full max-w-md shadow-md">
                            <View className="items-center mb-4">
                                <Ionicons name="information-circle-outline" size={48} color="#16a34a" />
                            </View>
                            <Text className="text-xl font-semibold text-gray-900 text-center mb-2">
                                Processing Fee
                            </Text>
                            <Text className="text-base text-gray-700 text-center mb-6">
                                Paystack will charge ₦50 for this transaction. Do you want to continue?
                            </Text>
                            <View className="flex-row justify-between">
                                <TouchableOpacity
                                    onPress={() => setShowChargeNotice(false)}
                                    className="bg-gray-200 px-4 py-2 rounded-lg"
                                >
                                    <Text className="text-gray-700 font-medium">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowChargeNotice(false);
                                        setLoading(true);
                                        setTimeout(() => {
                                            setLoading(false);
                                            setShowPaystack(true);
                                        }, 800);
                                    }}
                                    className="bg-green-600 px-4 py-2 rounded-lg"
                                >
                                    <Text className="text-white font-medium">Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* ✅ Paystack WebView */}
                {showPaystack && (
                    <Paystack
                        paystackKey={PAY_STACK_PUBLIC_KEY}
                        amount={Number(amount)}
                        billingEmail={user.email}
                        activityIndicatorColor="#16a34a"
                        onCancel={() => setShowPaystack(false)}
                        onSuccess={handleSuccess}
                        autoStart={true}
                    />
                )}

                {/* ✅ Success Modal */}
                {showSuccess && (
                    <SuccessModal
                        visible={showSuccess}
                        onClose={() => {
                            setShowSuccess(false);
                            setAmount('');
                        }}
                        amount={paymentDetails?.amount}
                        email={paymentDetails?.email}
                        reference={paymentDetails?.reference}
                    />
                )}
            </View>
        </KeyboardAwareScrollView>
    );
}
