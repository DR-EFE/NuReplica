import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, spacing, typography } from '../theme';

export const ProcessingScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    amount?: string;
    recipientName?: string;
    bankName?: string;
    fullAccountClabe?: string;
    sourceType?: string;
  }>();

  const [stepText, setStepText] = useState<'step1' | 'step2' | 'step3'>('step1');
  const progressAnim = useRef(new Animated.Value(0.35)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Phase 1 -> Phase 2 (1.5s)
    const timer1 = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setStepText('step2');
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      });

      Animated.timing(progressAnim, {
        toValue: 0.72,
        duration: 1200,
        useNativeDriver: false,
      }).start();
    }, 1500);

    // Phase 2 -> Phase 3 ("¡Listo!") (3.0s)
    const timer2 = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setStepText('step3');
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      });

      Animated.timing(progressAnim, {
        toValue: 1.0,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }, 3000);

    // Phase 3 -> Navigate to Success screen (4.2s)
    const timer3 = setTimeout(() => {
      router.replace({
        pathname: '/transfer/success',
        params: {
          ...params,
        },
      });
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const getLabel = () => {
    switch (stepText) {
      case 'step1':
        return 'Transferencia en\ncamino...';
      case 'step2':
        return 'Preparando el\ncomprobante...';
      case 'step3':
        return '¡Listo!';
    }
  };

  const progressInterpolate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.spacer} />

        {/* Lower Third Loading State */}
        <View style={styles.bottomSection}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.stateTitle}>{getLabel()}</Text>
          </Animated.View>

          {/* Progress Bar Line */}
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                { width: progressInterpolate },
              ]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenPadding,
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    gap: 28,
  },
  stateTitle: {
    color: colors.textWhite,
    fontSize: 32,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    lineHeight: 38,
    minHeight: 80,
  },
  progressBarBackground: {
    height: 3.5,
    backgroundColor: '#262628',
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primaryMain,
    borderRadius: 2,
  },
});
