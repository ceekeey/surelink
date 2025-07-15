// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     Image,
//     Keyboard,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import Modal from 'react-native-modal';
// import Animated, { FadeInDown } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import PinModel from '../../../components/PinModal';
// import SuccessModal from '../../../components/SuccessModel';
// import { useAuth } from '../../../context/AuthContext';

// const ConfirmWithdraw = () => {
//     const { amount, accountNumber, accountName, note, bank } = useLocalSearchParams();

//     const [showChargeModal, setShowChargeModal] = useState(false);
//     const [showPin, setShowPin] = useState(false);
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const router = useRouter();
//     const { user } = useAuth();

//     useEffect(() => {
//         if (!user) {
//             router.replace('/(auth)/login');
//         }
//     }, [user]);

//     if (!user) return null;

//     const handleTransferPress = () => {
//         Keyboard.dismiss();

//         if (!accountNumber || !amount || isNaN(amount) || Number(amount) <= 0) {
//             Alert.alert('Invalid Input', 'Please enter a valid account and amount.');
//             return;
//         }

//         setShowChargeModal(true); // Show modal before PIN
//     };

//     const handleChargeConfirm = () => {
//         setShowChargeModal(false);
//         setShowPin(true);
//     };

//     const handlePinConfirm = () => {
//         setShowPin(false);
//         setLoading(true);

//         setTimeout(() => {
//             setLoading(false);
//             setShowSuccess(true);
//         }, 1500);
//     };

//     return (
//         <SafeAreaView className="flex-1 bg-white px-5 pt-6">
//             <Animated.View entering={FadeInDown.duration(500)} className="items-center mb-6">
//                 <Image
//                     source={require('../../../assets/images/user.png')}
//                     className="w-24 h-24 rounded-full mb-4"
//                     resizeMode="cover"
//                 />
//                 <Text className="text-xl font-bold text-gray-800">Withdraw Confirmation</Text>
//             </Animated.View>

//             <Animated.View
//                 entering={FadeInDown.delay(200).duration(600)}
//                 className="bg-gray-100 rounded-xl p-5 mb-6 shadow-sm"
//             >
//                 <View className="mb-3">
//                     <Text className="text-sm text-gray-500">Account Name</Text>
//                     <Text className="text-base font-semibold text-gray-800">{accountName}</Text>
//                 </View>

//                 <View className="mb-3">
//                     <Text className="text-sm text-gray-500">Bank</Text>
//                     <Text className="text-base font-semibold text-gray-800">{bank}</Text>
//                 </View>

//                 <View className="mb-3">
//                     <Text className="text-sm text-gray-500">Account Number</Text>
//                     <Text className="text-base font-semibold text-gray-800">{accountNumber}</Text>
//                 </View>

//                 <View className="mb-3">
//                     <Text className="text-sm text-gray-500">Amount</Text>
//                     <Text className="text-base font-semibold text-green-600">₦{amount}</Text>
//                 </View>

//                 {note ? (
//                     <View className="mb-2">
//                         <Text className="text-sm text-gray-500">Note</Text>
//                         <Text className="text-base font-medium text-gray-800">{note}</Text>
//                     </View>
//                 ) : null}
//             </Animated.View>

//             <TouchableOpacity
//                 onPress={handleTransferPress}
//                 disabled={loading}
//                 className="bg-green-600 rounded-xl py-4 items-center"
//             >
//                 {loading ? (
//                     <ActivityIndicator color="#fff" />
//                 ) : (
//                     <Text className="text-white font-bold text-base">Confirm & Withdraw</Text>
//                 )}
//             </TouchableOpacity>

//             {/* ₦50 Charge Modal */}
//             <Modal
//                 isVisible={showChargeModal}
//                 onBackdropPress={() => setShowChargeModal(false)}
//                 onBackButtonPress={() => setShowChargeModal(false)}
//                 style={{ justifyContent: 'flex-end', margin: 0 }}
//             >
//                 <View className="bg-white p-5 rounded-t-2xl">
//                     <Text className="text-lg font-bold text-gray-800 text-center mb-2">
//                         ₦50 Charge Notice
//                     </Text>
//                     <Text className="text-sm text-gray-600 text-center mb-4">
//                         Paystack will charge ₦50 for this withdrawal.
//                     </Text>

//                     <View className="flex-row justify-between">
//                         <TouchableOpacity
//                             onPress={() => setShowChargeModal(false)}
//                             className="flex-1 py-3 rounded-xl bg-gray-200 mr-2 items-center"
//                         >
//                             <Text className="text-gray-700 font-semibold">Cancel</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             onPress={handleChargeConfirm}
//                             className="flex-1 py-3 rounded-xl bg-green-600 ml-2 items-center"
//                         >
//                             <Text className="text-white font-semibold">Continue</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>

//             {/* PIN Modal */}
//             <PinModel
//                 visible={showPin}
//                 onClose={() => setShowPin(false)}
//                 onConfirm={handlePinConfirm}
//             />

//             {/* Success Modal */}
//             <SuccessModal
//                 visible={showSuccess}
//                 onClose={() => setShowSuccess(false)}
//                 recipient={accountName}
//                 accountNumber={accountNumber}
//                 bank={bank}
//                 note={note}
//                 reference={`TRANS-${Date.now()}`}
//                 redirect={'reciptprint'}
//                 amount={amount}
//                 type={'withdraw'}
//             />
//         </SafeAreaView>
//     );
// };

// export default ConfirmWithdraw;


import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Keyboard,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import PinModel from '../../../components/PinModal';
import SuccessModal from '../../../components/SuccessModel';
import { useAuth } from '../../../context/AuthContext';

const ConfirmWithdraw = () => {
    const { amount, accountNumber, accountName, note, bank } = useLocalSearchParams();

    const [showChargeModal, setShowChargeModal] = useState(false);
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

        if (!accountNumber || !amount || isNaN(amount) || Number(amount) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid account and amount.');
            return;
        }

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setShowChargeModal(true);
    };

    const handleChargeConfirm = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setShowChargeModal(false);
        setShowPin(true);
    };

    const handleChargeCancel = () => {
        Haptics.selectionAsync();
        setShowChargeModal(false);
    };

    const handlePinConfirm = () => {
        setShowPin(false);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);
        }, 1500);
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-5 pt-6">
            <Animated.View entering={FadeInDown.duration(500)} className="items-center mb-6">
                <Image
                    source={require('../../../assets/images/user.png')}
                    className="w-24 h-24 rounded-full mb-4"
                    resizeMode="cover"
                />
                <Text className="text-xl font-bold text-gray-800">Withdraw Confirmation</Text>
            </Animated.View>

            <Animated.View
                entering={FadeInDown.delay(200).duration(600)}
                className="bg-gray-100 rounded-xl p-5 mb-6 shadow-sm"
            >
                <InfoRow label="Account Name" value={accountName} />
                <InfoRow label="Bank" value={bank} />
                <InfoRow label="Account Number" value={accountNumber} />
                <InfoRow label="Amount" value={`₦${amount}`} color="text-green-600" />
                {note ? <InfoRow label="Note" value={note} /> : null}
            </Animated.View>

            <TouchableOpacity
                onPress={handleTransferPress}
                disabled={loading}
                className="bg-green-600 rounded-xl py-4 items-center"
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-bold text-base">Confirm & Withdraw</Text>
                )}
            </TouchableOpacity>

            {/* ₦50 Charge Modal */}
            <Modal
                isVisible={showChargeModal}
                onBackdropPress={handleChargeCancel}
                onBackButtonPress={handleChargeCancel}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View className="bg-white p-5 rounded-t-2xl items-center">
                    <LottieView
                        source={require('../../../assets/lottie/success.json')}
                        autoPlay
                        loop={false}
                        style={{ width: 120, height: 120, marginBottom: 10 }}
                    />
                    <Text className="text-lg font-bold text-gray-800 text-center mb-1">
                        ₦50 Charge Notice
                    </Text>
                    <Text className="text-sm text-gray-600 text-center mb-4">
                        Paystack will charge ₦50 for this withdrawal.
                    </Text>

                    <View className="flex-row justify-between w-full">
                        <TouchableOpacity
                            onPress={handleChargeCancel}
                            className="flex-1 py-3 rounded-xl bg-gray-200 mr-2 items-center"
                        >
                            <Text className="text-gray-700 font-semibold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleChargeConfirm}
                            className="flex-1 py-3 rounded-xl bg-green-600 ml-2 items-center"
                        >
                            <Text className="text-white font-semibold">Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
                recipient={accountName}
                accountNumber={accountNumber}
                bank={bank}
                note={note}
                reference={`TRANS-${Date.now()}`}
                redirect={'reciptprint'}
                amount={amount}
                type={'withdraw'}
            />
        </SafeAreaView>
    );
};

// Component for cleaner rows
const InfoRow = ({ label, value, color = 'text-gray-800' }) => (
    <View className="mb-3">
        <Text className="text-sm text-gray-500">{label}</Text>
        <Text className={`text-base font-semibold ${color}`}>{value}</Text>
    </View>
);

export default ConfirmWithdraw;
