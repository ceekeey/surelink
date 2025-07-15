// import { useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//     RefreshControl,
//     ScrollView,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useAuth } from '../../context/AuthContext';

// const services = [
//     { label: 'Airtime', icon: 'call-outline', route: 'buyairtime' },
//     { label: 'Data', icon: 'wifi-outline', route: 'buydata' },
//     { label: 'Electricity', icon: 'flash-outline', route: 'electricity' },
//     { label: 'Exams', icon: 'school-outline', route: 'exams' },
// ];

// export default function Home() {
//     const router = useRouter();
//     const [refreshing, setRefreshing] = useState(false);
//     const { user } = useAuth();

//     useEffect(() => {
//         if (!user || !user.verified) {
//             router.replace('login');
//         }
//     }, [user]);

//     if (!user || !user.verified) return null;

//     const onRefresh = () => {
//         setRefreshing(true);
//         setTimeout(() => setRefreshing(false), 1500);
//     };

//     return (
//         <SafeAreaView className="bg-white px-2 h-screen">
//             <ScrollView
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={onRefresh}
//                         colors={["#16a34a"]}
//                         tintColor="#16a34a" />
//                 }
//                 showsVerticalScrollIndicator={true}
//                 contentContainerStyle={{ paddingBottom: 20 }}
//             >
//                 <View className="mb-4">
//                     <Text className="text-gray-500 text-xl">Welcome back 👋</Text>
//                     <Text className="text-gray-900 text-md font-bold">{user?.fullName}</Text>
//                 </View>

//                 <View className="bg-primary rounded-2xl p-4 mb-5 flex justify-between flex-row">
//                     <View>
//                         <View className="flex justify-center ">
//                             <Text className="text-white text-sm">Available Balance <Ionicons name='eye' className="ml-4" size={20} /> </Text>
//                         </View>
//                         <Text className="text-white text-xl font-bold mt-1">₦ {user?.wallet_balance || 0}</Text>
//                     </View>
//                     <TouchableOpacity
//                         onPress={() => router.push('fundwallet')}
//                         className="bg-light flex justify-center items-center rounded-md p-2">
//                         <Text className="text-primary">fund wallet</Text>
//                     </TouchableOpacity>

//                 </View>

//                 <Text className="text-gray-700 font-bold text-xl mb-3">Recent Transactions</Text>
//                 <View className="gap-4">
//                     {[{
//                         title: 'Transfer to ISAH HARUNA ABDULHAMEED',
//                         amount: '-₦2,200.00',
//                         date: 'Jun 22nd, 17:56:39',
//                         type: 'debit',
//                         status: 'Successful',
//                     }, {
//                         title: 'Transfer from Opay Payment Gateway',
//                         amount: '+₦2,200.00',
//                         date: 'Jun 22nd, 16:34:25',
//                         type: 'credit',
//                         status: 'Successful',
//                     }].map((tx, index) => (
//                         <View
//                             key={index}
//                             className="bg-gray-100 rounded-xl flex-row items-center justify-between p-3 shadow-sm"
//                         >
//                             <View className="w-5 h-5 rounded-full bg-green-100 justify-center items-center mr-3">
//                                 <Ionicons name={tx.type === 'credit' ? 'arrow-down' : 'arrow-up'} size={20} color="#16a34a" />
//                             </View>
//                             <View className="flex-1">
//                                 <Text className="text-xs font-medium text-gray-900" numberOfLines={1}>{tx.title}</Text>
//                                 <Text className="text-xs text-gray-500 mt-0.5">{tx.date}</Text>
//                             </View>
//                             <View className="items-end">
//                                 <Text className={`font-bold text-xs ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>{tx.amount}</Text>
//                                 <Text className="text-xs text-green-600 font-medium mt-0.5">{tx.status}</Text>
//                             </View>
//                         </View>
//                     ))}
//                 </View>

//                 <Text className="text-gray-700 font-bold text-lg mt-6 mb-3">Quick Services</Text>
//                 <View className="flex-row flex-wrap justify-between">
//                     {services.map((item, index) => (
//                         <TouchableOpacity
//                             key={index}
//                             activeOpacity={0.8}
//                             onPress={() => router.push(item.route)}
//                             className="w-[48%] bg-gray-100 rounded-xl p-3 mb-3 flex-row items-center"
//                         >
//                             <Ionicons name={item.icon} size={20} color="#16a34a" />
//                             <Text className="ml-3 text-base text-gray-800 font-medium">{item.label}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             </ScrollView>

//         </SafeAreaView>
//     );
// }

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    Layout
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';

const services = [
    { label: 'Airtime', icon: 'call-outline', route: 'buyairtime' },
    { label: 'Data', icon: 'wifi-outline', route: 'buydata' },
    { label: 'Electricity', icon: 'flash-outline', route: 'electricity' },
    { label: 'Exams', icon: 'school-outline', route: 'exams' },
];

const Home = () => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user || !user.verified) {
            router.replace('login');
        }
    }, [user]);

    if (!user || !user.verified) return null;

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1200);
    };

    return (
        <SafeAreaView className="bg-white px-4 h-screen">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#16a34a']}
                        tintColor="#16a34a"
                    />
                }
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Greeting */}
                <Animated.View entering={FadeInDown.delay(100)} className="mb-4 mt-2">
                    <Text className="text-gray-500 text-lg">Welcome back 👋</Text>
                    <Text className="text-gray-900 text-xl font-bold">{user?.fullName}</Text>
                </Animated.View>

                {/* Balance Card */}
                <Animated.View
                    entering={FadeInDown.delay(200)}
                    layout={Layout.springify()}
                    className="bg-primary rounded-2xl p-5 mb-5 flex-row justify-between items-center"
                >
                    <View>
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => setShowBalance(prev => !prev)}
                        >
                            <Text className="text-white text-sm mr-2">Available Balance</Text>
                            <Ionicons
                                name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                                size={20}
                                color="#fff"
                            />
                        </TouchableOpacity>
                        <Animated.Text
                            className="text-white text-2xl font-bold mt-2"
                            entering={FadeInDown}
                            exiting={FadeInDown}
                            key={showBalance.toString()}
                        >
                            {showBalance ? `₦ ${user?.wallet_balance || 0}` : '***'}
                        </Animated.Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('fundwallet')}
                        className="bg-white rounded-md px-4 py-2"
                    >
                        <Text className="text-primary font-semibold">Fund Wallet</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Transactions */}
                <Animated.Text
                    entering={FadeInUp.delay(100)}
                    className="text-gray-700 font-bold text-lg mb-3"
                >
                    Recent Transactions
                </Animated.Text>
                {showBalance ? <Animated.View entering={FadeInUp.delay(200)} className="gap-3">
                    {[
                        {
                            title: 'Transfer to ISAH HARUNA ABDULHAMEED',
                            amount: '-₦2,200.00',
                            date: 'Jun 22nd, 17:56:39',
                            type: 'debit',
                            status: 'Successful',
                        },
                        {
                            title: 'Transfer from Opay Payment Gateway',
                            amount: '+₦2,200.00',
                            date: 'Jun 22nd, 16:34:25',
                            type: 'credit',
                            status: 'Successful',
                        },
                    ].map((tx, index) => (
                        <View
                            key={index}
                            className="bg-gray-100 rounded-xl flex-row items-center justify-between p-3"
                        >
                            <View className="w-6 h-6 rounded-full bg-green-100 justify-center items-center mr-3">
                                <Ionicons
                                    name={tx.type === 'credit' ? 'arrow-down-outline' : 'arrow-up-outline'}
                                    size={18}
                                    color="#16a34a"
                                />
                            </View>
                            <View className="flex-1 pr-2">
                                <Text className="text-xs font-medium text-gray-900" numberOfLines={1}>
                                    {tx.title}
                                </Text>
                                <Text className="text-xs text-gray-500 mt-0.5">{tx.date}</Text>
                            </View>
                            <View className="items-end">
                                <Text
                                    className={`font-bold text-xs ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'
                                        }`}
                                >
                                    {tx.amount}
                                </Text>
                                <Text className="text-xs text-green-600 mt-0.5 font-medium">{tx.status}</Text>
                            </View>
                        </View>
                    ))}
                </Animated.View> : null}

                {/* Services */}
                <Animated.Text
                    entering={FadeInUp.delay(300)}
                    className="text-gray-700 font-bold text-lg mt-6 mb-3"
                >
                    Quick Services
                </Animated.Text>
                <View className="flex-row flex-wrap justify-between">
                    {services.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => router.push(item.route)}
                            className="w-[48%] bg-gray-100 rounded-xl p-3 mb-3 flex-row items-center"
                        >
                            <Ionicons name={item.icon} size={20} color="#16a34a" />
                            <Text className="ml-3 text-base text-gray-800 font-medium">{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
