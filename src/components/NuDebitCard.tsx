import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

interface NuDebitCardProps {
  isBalanceVisible: boolean;
  debitBalance: number;
  onPress: () => void;
}

export const NuDebitCard: React.FC<NuDebitCardProps> = ({
  isBalanceVisible,
  debitBalance,
  onPress,
}) => {
  const formatMoney = (val: number) =>
    `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>Cuenta Nu de Débito</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.mediumEmphasis} />
      </View>
      <Text style={styles.mainBalance}>
        {isBalanceVisible ? formatMoney(debitBalance) : '$ •••••'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 4,
    paddingBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionTitle: {
    color: colors.textWhite,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  mainBalance: {
    color: colors.textWhite,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
});
