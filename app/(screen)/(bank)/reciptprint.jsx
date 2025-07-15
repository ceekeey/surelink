import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { router, useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ViewShot from 'react-native-view-shot';

import Logo from '../../../assets/images/icon.png';
import { useAuth } from '../../../context/AuthContext';

export default function receiptprint() {
    const { recipient, amount, note, reference, type, bank, accountNumber } = useLocalSearchParams();

    const receiptRef = useRef();
    const [saving, setSaving] = useState(false);
    const { user } = useAuth()

    const handleDownload = async () => {
        setSaving(true);
        try {
            const uri = await receiptRef.current.capture();
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'Enable media permission to save receipt.');
                return;
            }

            const fileName = `SureLink_Receipt_${reference}.png`;
            const newPath = FileSystem.documentDirectory + fileName;
            await FileSystem.copyAsync({ from: uri, to: newPath });
            await MediaLibrary.saveToLibraryAsync(newPath);

            Alert.alert('Receipt saved ✅', `Saved as ${fileName}`);
        } catch (error) {
            Alert.alert('Error', 'Failed to save receipt.');
        } finally {
            setSaving(false);
        }
    };

    const handleShare = async () => {
        try {
            const uri = await receiptRef.current.capture();
            await Sharing.shareAsync(uri);
        } catch (error) {
            Alert.alert('Error', 'Unable to share receipt.');
        }
    };

    return (
        <View className="flex-1 bg-[#fefefe] items-center justify-center p-2">
            <ViewShot ref={receiptRef} options={{ format: 'png', quality: 1.0 }}>
                <View className="bg-white p-6 rounded-2xl w-[320px] items-center border border-primary relative overflow-hidden">
                    {/* Background Logo */}
                    <Image
                        source={Logo}
                        resizeMode="contain"
                        className="absolute opacity-5 w-full h-full z-0"
                    />

                    {/* Watermark */}
                    <Text
                        className="absolute text-sm text-gray-300 opacity-20 z-0"
                        style={{ top: '40%', left: '10%', transform: [{ rotate: '-30deg' }] }}
                    >
                        Sure Link
                    </Text>
                    <Text
                        className="absolute text-sm text-gray-300 opacity-20 z-0"
                        style={{ top: '80%', left: '40%', transform: [{ rotate: '-60deg' }] }}
                    >
                        Sure Link
                    </Text>
                    <Text
                        className="absolute text-sm text-gray-300 opacity-20 z-0"
                        style={{ top: '80%', left: '40%', transform: [{ rotate: '70deg' }] }}
                    >
                        Sure Link
                    </Text>
                    <Text
                        className="absolute text-sm text-gray-300 opacity-20 z-0"
                        style={{ top: '10%', left: '80%', transform: [{ rotate: '-90deg' }] }}
                    >
                        Sure Link
                    </Text>
                    <Text
                        className="absolute text-sm text-gray-300 opacity-20 z-0"
                        style={{ top: '10%', left: '40%', transform: [{ rotate: '30deg' }] }}
                    >
                        Sure Link
                    </Text>

                    <Image source={Logo} resizeMode="contain" className="w-[80px] h-[80px] mb-3 z-10" />

                    <Text className="text-xl font-bold text-primary mb-1 z-10">
                        ₦{amount}
                    </Text>
                    <Text className="text-2xl font-semibold text-primary mb-1 z-10 capitalize">
                        {type} Successful
                    </Text>
                    <Text className="text-sm text-gray-500 mb-5 z-10">
                        {new Date().toLocaleString()}
                    </Text>

                    <View className="w-full mb-3 z-10">
                        <Text className="text-sm text-gray-400">Recipient</Text>
                        <Text className="text-base font-medium text-gray-900">{recipient}</Text>
                    </View>

                    {accountNumber &&
                        <View className="w-full mb-3 z-10">
                            <Text className="text-sm text-gray-400">Account Number</Text>
                            <Text className="text-base font-medium text-gray-900">{accountNumber}</Text>
                        </View>
                    }

                    {bank &&
                        <View className="w-full mb-3 z-10">
                            <Text className="text-sm text-gray-400">Bank</Text>
                            <Text className="text-base font-medium text-gray-900">{bank}</Text>
                        </View>
                    }

                    <View className="w-full mb-3 z-10">
                        <Text className="text-sm text-gray-400">Sender</Text>
                        <Text className="text-base font-medium text-gray-900">{user?.fullName}</Text>
                    </View>

                    <View className="w-full mb-3 z-10">
                        <Text className="text-sm text-gray-400">Note</Text>
                        <Text className="text-base font-medium text-gray-900">{note}</Text>
                    </View>

                    <View className="w-full mb-5 z-10">
                        <Text className="text-sm text-gray-400">Transaction Ref</Text>
                        <Text className="text-base font-medium text-gray-900">{reference}</Text>
                    </View>

                    <Text className="text-sm text-gray-600 mt-5 text-center z-10">
                        Thanks for using SureLink 💚
                    </Text>
                </View>
            </ViewShot>

            <View className="flex-row justify-between items-center mt-6 space-x-3 w-full px-4 max-w-md">
                <TouchableOpacity
                    className="bg-primary  w-22 h-22 p-4 items-center justify-center shadow-md"
                    onPress={() => router.replace('/home')}
                >
                    <Ionicons name="home-outline" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-primary  w-22 h-22 p-4 items-center justify-center shadow-md"
                    onPress={handleDownload}
                >
                    {saving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Ionicons name="download-outline" size={24} color="#fff" />
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-primary  w-22 h-22 p-4 items-center justify-center shadow-md"
                    onPress={handleShare}
                >
                    <Ionicons name="share-social-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
