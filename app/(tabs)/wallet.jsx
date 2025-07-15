import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeIn,
    Layout,
    SlideInRight,
    ZoomIn
} from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';

export default function WalletScreen() {
    const { user } = useAuth();

    const transactions = [
        { id: 1, type: 'Deposit', amount: 5000, date: '2025-06-20', icon: 'arrow-down-circle-outline' },
        { id: 2, type: 'Transfer', amount: -1500, date: '2025-06-19', icon: 'swap-horizontal-outline' },
        { id: 3, type: 'Airtime Recharge', amount: -200, date: '2025-06-18', icon: 'phone-portrait-outline' },
        { id: 4, type: 'Withdraw', amount: -3000, date: '2025-06-17', icon: 'arrow-up-circle-outline' },
    ];

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 bg-green-600 mb-2">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-semibold">My Wallet</Text>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/100' }}
                    className="w-10 h-10 rounded-full opacity-0"
                />
            </View>

            {/* Animated Balance Card */}
            <Animated.View
                entering={FadeIn.delay(200).duration(500)}
                layout={Layout.springify()}
                className="mx-4 -mt-6 bg-white p-5 rounded-2xl border border-green-100 shadow shadow-green-600/10 z-10"
            >
                <Text className="text-gray-500 text-sm">Current Balance</Text>
                <Text className="text-green-700 text-2xl font-bold mt-1">
                    ₦{user?.wallet_balance.toLocaleString()}
                </Text>
            </Animated.View>

            {/* Animated Actions */}
            <Animated.View
                entering={ZoomIn.delay(300)}
                className="flex-row justify-around mt-6 px-4"
            >
                {[
                    {
                        label: 'Transfer',
                        icon: 'swap-horizontal-outline',
                        route: '/(screen)/(bank)/transferfund',
                    },
                    {
                        label: 'Deposit',
                        icon: 'arrow-down-circle-outline',
                        route: '/(screen)/(bank)/fundwallet',
                    },
                    {
                        label: 'Withdraw',
                        icon: 'arrow-up-circle-outline',
                        route: '/(screen)/(bank)/withdrawfund',
                    },
                ].map((action, index) => (
                    <TouchableOpacity
                        key={action.label}
                        className="items-center"
                        onPress={() => router.push(action.route)}
                    >
                        <Animated.View
                            entering={ZoomIn.delay(400 + index * 100)}
                            className="bg-green-100 p-4 rounded-full"
                        >
                            <Ionicons name={action.icon} size={24} color="#16a34a" />
                        </Animated.View>
                        <Text className="mt-2 text-green-800 text-sm font-medium">{action.label}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>

            {/* Animated Transaction History */}
            <ScrollView className="mt-8 px-4" contentContainerStyle={{ paddingBottom: 120 }}>
                <Text className="text-gray-600 text-base font-semibold mb-3">Recent Transactions</Text>

                {transactions.map((tx, index) => (
                    <Animated.View
                        key={tx.id}
                        entering={SlideInRight.delay(100 * index).springify()}
                        layout={Layout.springify()}
                        className="flex-row items-center justify-between bg-green-50 rounded-xl px-4 py-4 mb-3 border border-green-100"
                    >
                        <View className="flex-row items-center space-x-3">
                            <Ionicons name={tx.icon} size={22} color="#16a34a" />
                            <View>
                                <Text className="text-green-800 text-base">{tx.type}</Text>
                                <Text className="text-gray-500 text-xs">{tx.date}</Text>
                            </View>
                        </View>
                        <Text className={`font-semibold ${tx.amount < 0 ? 'text-red-700' : 'text-green-700'}`}>
                            {tx.amount < 0 ? '-' : '+'}₦{Math.abs(tx.amount).toLocaleString()}
                        </Text>
                    </Animated.View>
                ))}

                {/* See All Button */}
                <Animated.View entering={FadeIn.delay(600)}>
                    <TouchableOpacity
                        onPress={() => router.push('/history')}
                        className="bg-green-600 py-3 rounded-xl items-center mt-2"
                    >
                        <Text className="text-white text-sm font-semibold">See All Transactions</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </View>
    );
}
