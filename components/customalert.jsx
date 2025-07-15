import { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomAlert = ({ visible, onClose, name }) => {
    const translateY = useRef(new Animated.Value(50)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="none">
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.alertBox,
                        {
                            transform: [{ translateY }],
                            opacity,
                        },
                    ]}
                >
                    <Text style={styles.title}>👋 Welcome Back!</Text>

                    <Text style={styles.message}>
                        {name} 
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>OK 👍</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    alertBox: {
        backgroundColor: '#16a34a',
        paddingVertical: hp('4%'),
        paddingHorizontal: wp('6%'),
        borderRadius: wp('5%'),
        width: '85%',
    },
    title: {
        color: '#fff',
        fontSize: wp('6.5%'),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    message: {
        color: '#fff',
        marginTop: hp('2%'),
        fontSize: wp('5%'),
        textAlign: 'center',
        lineHeight: hp('3%'),
    },
    button: {
        marginTop: hp('3%'),
        backgroundColor: '#fff',
        paddingVertical: hp('1.5%'),
        borderRadius: wp('4%'),
        alignItems: 'center',
    },
    buttonText: {
        color: '#16a34a',
        fontWeight: 'bold',
        fontSize: wp('4.5%'),
    },
});

export default CustomAlert;
