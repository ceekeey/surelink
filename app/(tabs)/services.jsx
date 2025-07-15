import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Pressable, Text } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const services = [
    { name: 'Airtime', icon: 'call-outline', route: 'buyairtime' },
    { name: 'Data', icon: 'wifi-outline', route: 'buydata' },
    { name: 'Electricity', icon: 'flash-outline', route: '/(screen)/electricity' },
    { name: 'Cable TV', icon: 'tv-outline', route: '/(screen)/cable' },
    { name: 'Betting', icon: 'football-outline', route: '/(screen)/betting' },
    { name: 'NIN', icon: 'finger-print-outline', route: '/(screen)/nin' },
    { name: 'Exams', icon: 'school-outline', route: '/(screen)/exams' },
];

export default function ServicesScreen() {
    return (
        <SafeAreaView className="bg-white px-4">
            <Animated.Text
                entering={FadeInDown.duration(400)}
                className="text-2xl font-bold text-green-600 mb-4"
            >
                Available Services
            </Animated.Text>

            <FlatList
                data={services}
                keyExtractor={(item) => item.name}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500 mt-10">
                        No services available.
                    </Text>
                }
                renderItem={({ item, index }) => (
                    <Animated.View
                        entering={FadeInUp.delay(index * 50).duration(400)}
                        className="w-[48%]"
                    >
                        <Pressable
                            onPress={() => router.push(item.route)}
                            className="bg-green-50 rounded-2xl p-5 mb-4 items-center shadow-sm active:opacity-80"
                            android_ripple={{ color: '#d1fae5', borderless: false }}
                        >
                            <Ionicons name={item.icon} size={30} color="#16a34a" />
                            <Text className="mt-2 text-green-700 font-semibold text-sm text-center">
                                {item.name}
                            </Text>
                        </Pressable>
                    </Animated.View>
                )}
            />
        </SafeAreaView>
    );
}
