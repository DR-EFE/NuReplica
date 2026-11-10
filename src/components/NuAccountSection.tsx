import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';
import { NuButton } from './NuButton';

interface NuAccountSectionProps {
  isBalanceVisible: boolean;
  debitBalance: number;
  creditPositiveBalance: number;
  creditAvailableLimit: number;
  autoPayActive: boolean;
  onPressDebit: () => void;
  onPressCredit: () => void;
  onPressDeferPurchases: () => void;
  onPressMyCards: () => void;
}

export const NuAccountSection: React.FC<NuAccountSectionProps> = ({
  isBalanceVisible,
  debitBalance,
  creditPositiveBalance,
  creditAvailableLimit,
  autoPayActive,
  onPressDebit,
  onPressCredit,
  onPressDeferPurchases,
  onPressMyCards,
}) => {
  const formatMoney = (val: number) => `$${val.toFixed(2)}`;

  return (
    <View style={styles.container}>
      {/* 1. Debit Account Header & Balance */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressDebit}
        style={styles.sectionHeader}
      >
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Cuenta Nu de Débito</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.mediumEmphasis} />
        </View>
        <Text style={styles.mainBalance}>
          {isBalanceVisible ? formatMoney(debitBalance) : '$ •••••'}
        </Text>
      </TouchableOpacity>

      {/* Thin Divider */}
      <View style={styles.divider} />

      {/* 2. Credit Card Section */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressCredit}
        style={styles.sectionHeader}
      >
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Tarjeta de crédito</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.mediumEmphasis} />
        </View>

        <Text style={styles.creditSubtitle}>Saldo a favor</Text>

        <Text style={styles.creditBalance}>
          {isBalanceVisible ? formatMoney(creditPositiveBalance) : '$ •••••'}
        </Text>

        <Text style={styles.limitText}>
          Límite disponible:{' '}
          {isBalanceVisible
            ? `$${creditAvailableLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
            : '$ •••••'}
        </Text>

        <View style={styles.autoPayRow}>
          <Text style={styles.autoPayLabel}>Pago automático: </Text>
          <Text style={styles.autoPayStatus}>
            {autoPayActive ? 'Activado' : 'Desactivado'}
          </Text>
        </View>

        <NuButton
          title="Diferir compras"
          variant="pill"
          size="small"
          onPress={onPressDeferPurchases}
          style={styles.deferButton}
        />
      </TouchableOpacity>

      {/* 3. My Cards (Mis tarjetas) Capsule/Bar */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressMyCards}
        style={styles.myCardsCapsule}
      >
        <MaterialCommunityIcons name="credit-card-outline" size={20} color={colors.textWhite} />
        <Text style={styles.myCardsText}>Mis tarjetas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  sectionHeader: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
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
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: 16,
  },
  creditSubtitle: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    fontFamily: typography.fontFamily,
    marginTop: 2,
    marginBottom: 4,
  },
  creditBalance: {
    color: colors.textWhite,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    marginBottom: 8,
  },
  limitText: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    marginBottom: 6,
  },
  autoPayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  autoPayLabel: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
  autoPayStatus: {
    color: colors.success,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  deferButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfacePill,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  myCardsCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    marginHorizontal: spacing.screenPadding,
    marginTop: 20,
    marginBottom: 28,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: radii.md,
    gap: 12,
  },
  myCardsText: {
    color: colors.textWhite,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
});
