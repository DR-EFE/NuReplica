import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';
import { NuHeader } from '../components/NuHeader';
import { useAccount } from '../context/AccountContext';

export const PinScreen: React.FC = () => {
  const router = useRouter();
  const { executeTransfer } = useAccount();
  const params = useLocalSearchParams<{
    amount?: string;
    recipientName?: string;
    bankName?: string;
    fullAccountClabe?: string;
    sourceType?: string;
  }>();

  const [pin, setPin] = useState<string>('');

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);

      if (nextPin.length === 4) {
        // Execute simulated transfer deducting from 1 Million balance
        const numAmount = parseFloat(params.amount || '0.01');
        executeTransfer({
          amount: numAmount,
          recipientName: params.recipientName || 'Ramos Velázquez Felipe',
          bankName: params.bankName || 'BBVA MEXICO',
          fullAccountClabe: params.fullAccountClabe || '0121 8001 5025 927922',
          sourceType: params.sourceType || 'Cuenta de débito',
        });

        setTimeout(() => {
          router.push({
            pathname: '/transfer/processing',
            params: {
              ...params,
            },
          });
        }, 250);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin((prev) => prev.slice(0, -1));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* Header with Back Arrow */}
      <NuHeader type="back" onPress={() => router.back()} />

      <View style={styles.container}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.subtitleCategory}>Cuenta Nu</Text>
          <Text style={styles.mainTitle}>Ingresa tu NIP</Text>
        </View>

        {/* Card and Security PIN Box Mockup */}
        <View style={styles.cardGraphicContainer}>
          {/* Peeking Purple Nu Card */}
          <View style={styles.nuCard}>
            <Text style={styles.nuLogoText}>nu</Text>
            <View style={styles.cardRightInfo}>
              <Text style={styles.cardAccountLabel}>Cuenta</Text>
              <MaterialCommunityIcons name="contactless-payment" size={20} color={colors.textWhite} />
            </View>
          </View>

          {/* Dark Overlay Box with 4 Security Dots */}
          <View style={styles.pinOverlayBox}>
            {[0, 1, 2, 3].map((index) => {
              const isFilled = index < pin.length;
              return (
                <View
                  key={index}
                  style={[
                    styles.pinDot,
                    isFilled ? styles.pinDotFilled : styles.pinDotEmpty,
                  ]}
                />
              );
            })}
          </View>
        </View>

        {/* Explanatory text */}
        <Text style={styles.helperText}>
          Es el número de 4 dígitos con el que autorizas transferencias en tu Cuenta Nu.
        </Text>

        <View style={styles.spacer} />

        {/* Custom Numeric Keypad */}
        <View style={styles.keypad}>
          <View style={styles.keypadRow}>
            {['1', '2', '3'].map((n) => (
              <TouchableOpacity
                key={n}
                activeOpacity={0.6}
                style={styles.keypadKey}
                onPress={() => handleKeyPress(n)}
              >
                <Text style={styles.keypadNumber}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['4', '5', '6'].map((n) => (
              <TouchableOpacity
                key={n}
                activeOpacity={0.6}
                style={styles.keypadKey}
                onPress={() => handleKeyPress(n)}
              >
                <Text style={styles.keypadNumber}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['7', '8', '9'].map((n) => (
              <TouchableOpacity
                key={n}
                activeOpacity={0.6}
                style={styles.keypadKey}
                onPress={() => handleKeyPress(n)}
              >
                <Text style={styles.keypadNumber}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            <View style={styles.keypadKey} />
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.keypadKey}
              onPress={() => handleKeyPress('0')}
            >
              <Text style={styles.keypadNumber}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.keypadKey}
              onPress={handleBackspace}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="backspace-outline" size={26} color={colors.textWhite} />
            </TouchableOpacity>
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
  },
  titleSection: {
    marginTop: 4,
    marginBottom: 28,
  },
  subtitleCategory: {
    color: '#820AD1',
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    marginBottom: 8,
  },
  mainTitle: {
    color: colors.textWhite,
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  cardGraphicContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
    position: 'relative',
  },
  nuCard: {
    width: '92%',
    height: 120,
    backgroundColor: '#A633E6',
    borderRadius: radii.md,
    paddingHorizontal: 20,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nuLogoText: {
    color: colors.textWhite,
    fontSize: 26,
    fontWeight: typography.weights.bold,
    letterSpacing: -1,
  },
  cardRightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardAccountLabel: {
    color: colors.textWhite,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  pinOverlayBox: {
    width: '100%',
    height: 82,
    backgroundColor: '#1E1E20',
    borderRadius: radii.lg,
    marginTop: -50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 36,
    borderWidth: 1,
    borderColor: '#2A2A2D',
  },
  pinDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pinDotEmpty: {
    backgroundColor: '#555558',
  },
  pinDotFilled: {
    backgroundColor: colors.textWhite,
    transform: [{ scale: 1.25 }],
  },
  helperText: {
    color: colors.mediumEmphasis,
    fontSize: 14.5,
    lineHeight: 21,
    fontFamily: typography.fontFamily,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  spacer: {
    flex: 1,
  },
  keypad: {
    paddingBottom: 24,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  keypadKey: {
    width: 80,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypadNumber: {
    color: colors.textWhite,
    fontSize: 26,
    fontWeight: typography.weights.medium,
    fontFamily: typography.fontFamily,
  },
});
