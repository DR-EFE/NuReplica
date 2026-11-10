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
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { NuHeader } from '../components/NuHeader';
import { NuAccountCardSelect } from '../components/NuAccountCardSelect';
import { NuButton } from '../components/NuButton';
import { useAccount } from '../context/AccountContext';
import { TransferSource } from '../mock/data';

export const AmountScreen: React.FC = () => {
  const router = useRouter();
  const { balance } = useAccount();
  const params = useLocalSearchParams<{
    contactId?: string;
    contactName?: string;
    displayName?: string;
    bankName?: string;
    fullAccountClabe?: string;
  }>();

  const recipientName = params.contactName || 'Ramos Velázquez Felipe';
  const [amountCents, setAmountCents] = useState<number>(0); // 1 = $0.01
  const [selectedSource, setSelectedSource] = useState<'debit' | 'credit'>('debit');

  const dynamicSources: TransferSource[] = [
    {
      id: 'debit',
      title: 'Cuenta de débito',
      amountFormatted: `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      rawAmount: balance,
      subtitle: 'Envío inmediato',
    },
    {
      id: 'credit',
      title: 'Tarjeta de crédito',
      amountFormatted: '$13,600.00',
      rawAmount: 13600.0,
      badge: 'A 12 meses',
      subtitle: 'Envío inmediato',
    },
  ];

  const formatAmount = (cents: number) => {
    const dollars = (cents / 100).toFixed(2);
    return `$ ${dollars}`;
  };

  const handleKeyPress = (num: string) => {
    if (num === 'backspace') {
      setAmountCents((prev) => Math.floor(prev / 10));
    } else {
      const parsed = parseInt(num, 10);
      setAmountCents((prev) => {
        if (prev > 999999) return prev;
        return prev * 10 + parsed;
      });
    }
  };

  const handleSetExact001 = () => {
    setAmountCents(1); // Exact $0.01 as in Screenshot 4
  };

  const handleContinue = () => {
    const formatted = (amountCents / 100).toFixed(2);
    router.push({
      pathname: '/transfer/confirm',
      params: {
        amount: formatted,
        recipientName: recipientName,
        bankName: params.bankName || 'BBVA MEXICO',
        fullAccountClabe: params.fullAccountClabe || '0121 8001 5025 927922',
        sourceType: selectedSource === 'debit' ? 'Cuenta de débito' : 'Tarjeta de crédito',
      },
    });
  };

  const isAmountValid = amountCents > 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* Header with back arrow */}
      <NuHeader type="back" onPress={() => router.back()} />

      <View style={styles.container}>
        {/* Recipient Details */}
        <View style={styles.headerInfo}>
          <Text style={styles.label}>Transferir a</Text>
          <Text style={styles.recipientName}>{recipientName}</Text>
        </View>

        {/* Amount Input Display */}
        <View style={styles.amountSection}>
          <Text style={styles.label}>Monto</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={handleSetExact001}>
            <Text style={styles.amountValue}>{formatAmount(amountCents)}</Text>
          </TouchableOpacity>
          <View style={styles.amountUnderline} />
        </View>

        {/* Quick Amount presets to match Screenshot 4 ($0.01) */}
        <View style={styles.presetRow}>
          <TouchableOpacity
            style={[styles.presetChip, amountCents === 1 && styles.presetChipActive]}
            onPress={handleSetExact001}
          >
            <Text style={[styles.presetText, amountCents === 1 && styles.presetTextActive]}>
              $0.01 (Captura)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.presetChip, amountCents === 10000 && styles.presetChipActive]}
            onPress={() => setAmountCents(10000)}
          >
            <Text style={styles.presetText}>$100.00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.presetChip, amountCents === 50000 && styles.presetChipActive]}
            onPress={() => setAmountCents(50000)}
          >
            <Text style={styles.presetText}>$500.00</Text>
          </TouchableOpacity>
        </View>

        {/* Transfer Source Cards */}
        <NuAccountCardSelect
          sources={dynamicSources}
          selectedSourceId={selectedSource}
          onSelectSource={(id) => setSelectedSource(id)}
        />

        <View style={styles.spacer} />

        {/* Custom Nubank-style Mini Numeric Pad */}
        <View style={styles.keypadContainer}>
          <View style={styles.keypadRow}>
            {['1', '2', '3'].map((n) => (
              <TouchableOpacity
                key={n}
                style={styles.keypadBtn}
                onPress={() => handleKeyPress(n)}
              >
                <Text style={styles.keypadText}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['4', '5', '6'].map((n) => (
              <TouchableOpacity
                key={n}
                style={styles.keypadBtn}
                onPress={() => handleKeyPress(n)}
              >
                <Text style={styles.keypadText}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['7', '8', '9'].map((n) => (
              <TouchableOpacity
                key={n}
                style={styles.keypadBtn}
                onPress={() => handleKeyPress(n)}
              >
                <Text style={styles.keypadText}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            <TouchableOpacity
              style={styles.keypadBtn}
              onPress={() => setAmountCents(0)}
            >
              <Text style={styles.keypadSubText}>Borrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadBtn}
              onPress={() => handleKeyPress('0')}
            >
              <Text style={styles.keypadText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadBtn}
              onPress={() => handleKeyPress('backspace')}
            >
              <Ionicons name="backspace-outline" size={24} color={colors.textWhite} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Continue Button (Visible when amount > 0 as in Screenshot 4) */}
        {isAmountValid && (
          <View style={styles.bottomBar}>
            <NuButton
              title="Continuar con la cuenta"
              variant="primary"
              size="large"
              onPress={handleContinue}
              style={styles.continueButton}
            />
          </View>
        )}
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
  },
  headerInfo: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: 4,
    marginBottom: 24,
  },
  label: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    marginBottom: 6,
  },
  recipientName: {
    color: colors.textWhite,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  amountSection: {
    paddingHorizontal: spacing.screenPadding,
    marginBottom: 8,
  },
  amountValue: {
    color: colors.textWhite,
    fontSize: 34,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    letterSpacing: 0.5,
    marginVertical: 4,
  },
  amountUnderline: {
    height: 1.5,
    backgroundColor: colors.borderDefault,
    marginTop: 8,
  },
  presetRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPadding,
    gap: 8,
    marginTop: 12,
  },
  presetChip: {
    backgroundColor: colors.surfaceHover,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  presetChipActive: {
    backgroundColor: colors.primaryDark,
  },
  presetText: {
    color: colors.mediumEmphasis,
    fontSize: 12,
    fontWeight: typography.weights.medium,
  },
  presetTextActive: {
    color: colors.textWhite,
    fontWeight: typography.weights.bold,
  },
  spacer: {
    flex: 1,
  },
  keypadContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 8,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  keypadBtn: {
    width: 64,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypadText: {
    color: colors.textWhite,
    fontSize: 22,
    fontWeight: typography.weights.medium,
    fontFamily: typography.fontFamily,
  },
  keypadSubText: {
    color: colors.mediumEmphasis,
    fontSize: 13,
    fontFamily: typography.fontFamily,
  },
  bottomBar: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: colors.background,
  },
  continueButton: {
    backgroundColor: colors.primaryMain,
    borderRadius: 999,
    paddingVertical: 16,
  },
});
