import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ONBOARDING_DATA } from '../constants/onboardingData';
import { useAuth } from '../context/AuthContext';

const AUTO_SCROLL_INTERVAL = 4000;

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const hasNavigatedRef = useRef(false); // 👈 prevent double navigation
  const { user, loading } = useAuth();   // make sure `loading` is in your auth context

  useEffect(() => {
    if (loading) return; // wait for user to be loaded

    if (user?.verified && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      router.replace('/home');
    }
  }, [user, loading]);

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < ONBOARDING_DATA.length - 1) {
        flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      } else {
        clearInterval(timer);
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({ index: ONBOARDING_DATA.length - 1 });
  };

  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.image}
      style={{
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'flex-end',
      }}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      />
      <Animated.View
        style={{
          opacity: fadeAnim,
          paddingHorizontal: wp('8%'),
          paddingBottom: hp('15%'),
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: wp('9%'),
            fontWeight: '800',
            letterSpacing: 0.5,
            marginBottom: hp('2%'),
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: wp('4%'),
            lineHeight: hp('3.5%'),
            opacity: 0.9,
          }}
        >
          {item.description}
        </Text>
      </Animated.View>
    </ImageBackground>
  );

  return (
    <SafeAreaView edges={['left', 'right']}>
      {currentIndex < ONBOARDING_DATA.length - 1 && (
        <TouchableOpacity
          onPress={handleSkip}
          style={{
            position: 'absolute',
            top: hp('6%'),
            right: wp('5%'),
            paddingHorizontal: wp('4%'),
            paddingVertical: hp('1%'),
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: wp('5%'),
            borderWidth: 1,
            borderColor: '#fff',
            zIndex: 10,
          }}
          accessibilityLabel="Skip Onboarding"
        >
          <Text
            style={{
              color: "#fff",
              fontSize: wp('4%'),
              fontWeight: '600',
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={ONBOARDING_DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        ref={flatListRef}
      />

      {/* Pagination Dots */}
      <View
        style={{
          position: 'absolute',
          bottom: hp('18%'),
          width: wp('100%'),
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {ONBOARDING_DATA.map((_, i) => (
          <Animated.View
            key={i}
            style={{
              width: currentIndex === i ? wp('4%') : wp('2.5%'),
              height: currentIndex === i ? wp('4%') : wp('2.5%'),
              borderRadius: wp('2%'),
              backgroundColor: currentIndex === i ? "#16a34a" : '#9ca3af',
              marginHorizontal: wp('1.2%'),
              opacity: currentIndex === i ? 1 : 0.6,
            }}
          />
        ))}
      </View>

      {/* Next / Get Started button */}
      <TouchableOpacity
        onPress={handleNext}
        style={{
          position: 'absolute',
          bottom: hp('6%'),
          alignSelf: 'center',
          backgroundColor: "#16a34a",
          borderRadius: wp('10%'),
          paddingHorizontal: wp('18%'),
          paddingVertical: hp('1.8%'),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 4,
        }}
        accessibilityLabel="Next or Get Started"
      >
        <Text
          style={{
            color: "#fff",
            fontSize: wp('4.8%'),
            fontWeight: '600',
          }}
        >
          {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;


// import * as Haptics from 'expo-haptics';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ImageBackground,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   useSharedValue,
// } from 'react-native-reanimated';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ONBOARDING_DATA } from '../constants/onboardingData';
// import { useAuth } from '../context/AuthContext';

// const OnboardingScreen = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollX = useSharedValue(0);
//   const flatListRef = useRef(null);
//   const { user, loading } = useAuth();
//   const hasNavigatedRef = useRef(false);

//   useEffect(() => {
//     if (!loading && user?.verified && !hasNavigatedRef.current) {
//       hasNavigatedRef.current = true;
//       router.replace('/home');
//     }
//   }, [user, loading]);

//   const onScroll = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollX.value = event.contentOffset.x;
//     },
//   });

//   const handleNext = () => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     if (currentIndex < ONBOARDING_DATA.length - 1) {
//       flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
//     } else {
//       router.push('/login');
//     }
//   };

//   const handleSkip = () => {
//     flatListRef.current?.scrollToIndex({ index: ONBOARDING_DATA.length - 1 });
//   };

//   const renderItem = ({ item }) => (
//     <ImageBackground
//       source={item.image}
//       style={{
//         width: wp('100%'),
//         height: hp('100%'),
//         justifyContent: 'flex-end',
//       }}
//       resizeMode="cover"
//     >
//       <LinearGradient
//         colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
//         style={{ position: 'absolute', inset: 0 }}
//       />
//       <View style={{ paddingHorizontal: wp('8%'), paddingBottom: hp('15%') }}>
//         <Text style={{
//           color: "#fff",
//           fontSize: wp('9%'),
//           fontWeight: '800',
//           letterSpacing: 0.5,
//           marginBottom: hp('2%'),
//         }}>{item.title}</Text>
//         <Text style={{
//           color: "#fff",
//           fontSize: wp('4%'),
//           lineHeight: hp('3.5%'),
//           opacity: 0.9,
//         }}>{item.description}</Text>
//       </View>
//     </ImageBackground>
//   );

//   return (
//     <SafeAreaView edges={['left', 'right']}>
//       {currentIndex < ONBOARDING_DATA.length - 1 && (
//         <TouchableOpacity
//           onPress={handleSkip}
//           style={{
//             position: 'absolute',
//             top: hp('6%'),
//             right: wp('5%'),
//             paddingHorizontal: wp('4%'),
//             paddingVertical: hp('1%'),
//             backgroundColor: 'rgba(255,255,255,0.15)',
//             borderRadius: wp('5%'),
//             borderWidth: 1,
//             borderColor: '#fff',
//             zIndex: 10,
//           }}
//           accessibilityLabel="Skip Onboarding"
//         >
//           <Text style={{ color: "#fff", fontSize: wp('4%'), fontWeight: '600' }}>Skip</Text>
//         </TouchableOpacity>
//       )}

//       <Animated.FlatList
//         ref={flatListRef}
//         data={ONBOARDING_DATA}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.key}
//         renderItem={renderItem}
//         onScroll={onScroll}
//         scrollEventThrottle={16}
//         onMomentumScrollEnd={(e) => {
//           const index = Math.round(e.nativeEvent.contentOffset.x / wp('100%'));
//           setCurrentIndex(index);
//         }}
//       />

//       <View style={{
//         position: 'absolute',
//         bottom: hp('18%'),
//         width: wp('100%'),
//         flexDirection: 'row',
//         justifyContent: 'center',
//       }}>
//         {ONBOARDING_DATA.map((_, i) => {
//           const animatedDotStyle = useAnimatedStyle(() => {
//             const inputRange = [(i - 1) * wp('100%'), i * wp('100%'), (i + 1) * wp('100%')];
//             const width = interpolate(scrollX.value, inputRange, [wp('2.5%'), wp('4.5%'), wp('2.5%')], Extrapolate.CLAMP);
//             const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5]);
//             return {
//               width,
//               opacity,
//               height: wp('4%'),
//               borderRadius: wp('2%'),
//               backgroundColor: '#16a34a',
//               marginHorizontal: wp('1.2%'),
//             };
//           });

//           return <Animated.View key={i} style={animatedDotStyle} />;
//         })}
//       </View>

//       <TouchableOpacity
//         onPress={handleNext}
//         style={{
//           position: 'absolute',
//           bottom: hp('6%'),
//           alignSelf: 'center',
//           backgroundColor: "#16a34a",
//           borderRadius: wp('10%'),
//           paddingHorizontal: wp('18%'),
//           paddingVertical: hp('1.8%'),
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 3 },
//           shadowOpacity: 0.2,
//           shadowRadius: 6,
//           elevation: 4,
//         }}
//         accessibilityLabel="Next or Get Started"
//       >
//         <Text style={{ color: "#fff", fontSize: wp('4.8%'), fontWeight: '600' }}>
//           {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
//         </Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default OnboardingScreen;