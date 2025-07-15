import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';


const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)

    const { user } = useAuth();

    useEffect(() => {
        if (!user || !user.verified) {
            router.replace('/(auth)/login');
        }
    }, [user]);

    if (!user || !user.verified) return null;


    const isFormValid = email.trim() !== '' && password.trim() !== '';

    const handleSubmit = async () => {
        if (!isFormValid) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            return;
        }

        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        handleLogin(email, password);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-white"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView edges={['bottom']}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="py-2 flex justify-center items-center" style={{ marginVertical: hp(8) }}>
                            <Text className="text-green-600" style={{ fontSize: widthPercentageToDP(10) }}>Edit Profile</Text>
                        </View>
                        <View className="flex-1 px-8">
                            {/* email  */}
                            <Text className="text-base mb-2">Email</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg px-4 py-3 text-base mb-4"
                                placeholder="Enter Email"
                                keyboardType="email-address"
                                returnKeyType="next"
                                value={user?.email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />

                            {/* name */}
                            <Text className="text-base mb-2">Name</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg px-4 py-3 text-base mb-4"
                                placeholder="Enter Email"
                                keyboardType="email-address"
                                returnKeyType="next"
                                value={user?.fullName}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />

                            {/* phone */}
                            <Text className="text-base mb-2">Phone Number</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg px-4 py-3 text-base mb-4"
                                placeholder="Enter Email"
                                keyboardType="email-address"
                                returnKeyType="next"
                                value={user?.phone}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />

                            {/* login btn  */}
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className={`rounded-lg py-4 items-center mb-6 bg-primary  }`}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" className="text-green-600" />
                                ) : (
                                    <Text className="text-white text-base font-semibold">Saved Changes</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

export default EditProfile