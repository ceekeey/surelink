import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    Layout
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConfirmModal from '../../components/confirmmodel';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const router = useRouter();
    const [showConfirm, setShowConfirm] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const { logout, user } = useAuth();

    useEffect(() => {
        if (!user) router.replace('/(auth)/login');
    }, [user]);

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await logout();
            router.replace('/(auth)/login');
        } catch (error) {
            console.log('Logout error:', error);
            Alert.alert('Error', 'Something went wrong while logging out.');
        } finally {
            setLoggingOut(false);
        }
    };

    if (!user) return null;

    return (
        <SafeAreaView className="flex-1 bg-white px-5 pt-6">
            <Animated.View entering={FadeInDown.delay(100)} className="items-center mb-6">
                <Image
                    source={require('../../assets/images/user.png')}
                    className="w-24 h-24 rounded-full mb-2"
                />
                <Text className="text-xl font-bold text-gray-900">{user.fullName}</Text>
                <Text className="text-sm text-gray-500 mt-1">{user.email}</Text>
            </Animated.View>

            <View className="space-y-5">
                {[
                    {
                        icon: 'person-outline',
                        label: 'Edit Profile',
                        onPress: () => router.push('/(screen)/editprofile'),
                    },
                    {
                        icon: 'lock-closed-outline',
                        label: 'Security',
                        onPress: () => router.push('/(screen)/security'),
                    },
                    {
                        icon: 'help-circle-outline',
                        label: 'Help & Support',
                        onPress: () => router.push('/(screen)/support'),
                    },
                    {
                        icon: 'log-out-outline',
                        label: 'Logout',
                        color: '#dc2626',
                        onPress: () => setShowConfirm(true),
                    },
                ].map((opt, i) => (
                    <Animated.View
                        key={opt.label}
                        entering={FadeIn.delay(150 * (i + 1))}
                        layout={Layout.springify()}
                    >
                        <Option {...opt} />
                    </Animated.View>
                ))}
            </View>

            <ConfirmModal
                visible={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleLogout}
            />
        </SafeAreaView>
    );
};

const Option = ({ icon, label, onPress, color = '#111827', disabled = false }) => (
    <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.7}
        onPress={disabled ? null : onPress}
        className={`flex-row items-center bg-gray-100 py-3 px-4 rounded-xl ${disabled ? 'opacity-60' : ''
            }`}
    >
        <Ionicons name={icon} size={24} color={color} />
        <Text className="ml-3 text-base font-medium" style={{ color }}>
            {label}
        </Text>
    </TouchableOpacity>
);

export default Profile;
