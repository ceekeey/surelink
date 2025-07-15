import { Tabs } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabIcon = ({ name, focused, label }) => {
    const scaleAnim = useRef(new Animated.Value(focused ? 1.2 : 1)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: focused ? 1.2 : 1,
            useNativeDriver: true,
            friction: 4,
        }).start();
    }, [focused]);

    return (
        <Animated.View
            style={{
                flex: 1, // 👈 TAKE ALL vertical space of tab item
                justifyContent: 'center', // 👈 CENTER vertically
                alignItems: 'center',     // 👈 CENTER horizontally
                transform: [{ scale: scaleAnim }],
            }}
        >
            <Ionicons
                name={focused ? name : `${name}-outline`}
                size={wp('5%')}
                color={focused ? '#16a34a' : '#999'}
                style={{
                    textShadowColor: focused ? '#16a34a' : 'transparent',
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: focused ? 6 : 0,
                }}
            />
            <Text
                style={{
                    marginTop: 2,
                    fontSize: wp('2.5%'),
                    color: focused ? '#16a34a' : '#666',
                    fontWeight: focused ? '700' : '400',
                    textAlign: 'center',
                }}
            >
                {label}
            </Text>
        </Animated.View>
    );
};

export default function TabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                lazy: true,
                unmountOnBlur: true,
                tabBarBackground: () => (
                    <View style={{ flex: 1, backgroundColor: '#fff' }} />
                ),
                tabBarStyle: {
                    position: 'absolute',
                    marginBottom: 10,
                    height: hp(1) + insets.bottom,
                    backgroundColor: 'transparent',
                    borderTopWidth: 0, // ✅ remove border
                    elevation: 0,       // ✅ remove shadow on Android
                    shadowColor: 'transparent', // ✅ remove shadow on iOS fallback
                },
                tabBarItemStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >

            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} label="Home" />,
                }}
            />
            <Tabs.Screen
                name="services"
                options={{
                    tabBarLabel: 'Services',
                    tabBarIcon: ({ focused }) => <TabIcon name="apps" focused={focused} label="Services" />,
                }}
            />
            <Tabs.Screen
                name="wallet"
                options={{
                    tabBarLabel: 'Wallet',
                    tabBarIcon: ({ focused }) => <TabIcon name="wallet" focused={focused} label="Wallet" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} label="Profile" />,
                }}
            />
        </Tabs>
    );
}