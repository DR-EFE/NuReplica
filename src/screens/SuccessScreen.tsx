import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';
import { NuHeader } from '../components/NuHeader';
import { NuButton } from '../components/NuButton';

export const SuccessScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    amount?: string;
    recipientName?: string;
    bankName?: string;
    fullAccountClabe?: string;
    sourceType?: string;
  }>();

  const amount = params.amount || '0.01';
  const recipientName = params.recipientName || 'Ramos Velázquez Felipe';
  const bankName = params.bankName || 'BBVA MEXICO';
  const fullAccountClabe = params.fullAccountClabe || '0121 8001 5025 927922';
  const sourceType = params.sourceType || 'Cuenta de débito';

  const handleOpenReceipt = () => {
    router.push('/transfer/receipt');
  };

  const handleClose = () => {
    router.replace('/home' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* Top Header with 'X' Close */}
      <NuHeader type="close" onPress={handleClose} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Graphic: 3 Diagonal Coins with Green Checkmark */}
        <View style={styles.graphicContainer}>
          <View style={styles.trailBackground} />
          <View style={[styles.coin, styles.coinBottom]}>
            <View style={styles.innerCoin} />
          </View>
          <View style={[styles.coin, styles.coinMiddle]}>
            <View style={styles.innerCoin} />
          </View>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={32} color={colors.textWhite} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>¡Listo! Enviaste tu dinero</Text>

        {/* Amount & Recipient */}
        <View style={styles.amountCard}>
          <Text style={styles.amountText}>${amount}</Text>
          <Text style={styles.recipientText}>Para {recipientName}</Text>
        </View>

        {/* Status Row */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Estatus</Text>
          <Text style={styles.statusValue}>Aceptada</Text>
        </View>

        {/* CEP Banxico Row */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleOpenReceipt}
          style={styles.banxicoRow}
        >
          <View>
            <Text style={styles.banxicoTitle}>CEP Banxico</Text>
            <Text style={styles.banxicoSubtitle}>Verifica el estatus</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.mediumEmphasis} />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenReceipt}
          style={styles.receiptButton}
        >
          <Ionicons name="receipt-outline" size={20} color={colors.textWhite} />
          <Text style={styles.receiptButtonText}>Abrir comprobante</Text>
        </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 12,
    paddingBottom: 40,
  },
  graphicContainer: {
    width: 170,
    height: 130,
    marginTop: 8,
    marginBottom: 28,
    position: 'relative',
  },
  trailBackground: {
    position: 'absolute',
    top: 15,
    left: 20,
    width: 130,
    height: 90,
    backgroundColor: 'rgba(26, 174, 92, 0.18)',
    borderRadius: 45,
    transform: [{ rotate: '-32deg' }],
  },
  coin: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCoin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  coinBottom: {
    bottom: 4,
    left: 4,
    backgroundColor: '#A633E6',
  },
  coinMiddle: {
    top: 32,
    left: 48,
    backgroundColor: '#7A1BBF',
  },
  checkCircle: {
    position: 'absolute',
    top: 4,
    right: 12,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    color: colors.textWhite,
    fontSize: 27,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    marginBottom: 28,
  },
  amountCard: {
    marginBottom: 32,
    gap: 6,
  },
  amountText: {
    color: colors.textWhite,
    fontSize: 34,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  recipientText: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    fontFamily: typography.fontFamily,
  },
  infoRow: {
    marginBottom: 28,
    gap: 4,
  },
  label: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
  statusValue: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  banxicoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  banxicoTitle: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
    marginBottom: 4,
  },
  banxicoSubtitle: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
  bottomBar: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  receiptButton: {
    backgroundColor: colors.primaryMain,
    borderRadius: radii.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 10,
  },
  receiptButtonText: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.card,
    borderTopRightRadius: radii.card,
    padding: spacing.xxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: colors.textWhite,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  receiptBody: {
    backgroundColor: colors.surfaceHover,
    borderRadius: radii.md,
    padding: 16,
    gap: 12,
  },
  receiptItem: {
    gap: 2,
  },
  rDivider: {
    height: 1,
    backgroundColor: colors.borderDefault,
    marginVertical: 4,
  },
  rLabel: {
    color: colors.mediumEmphasis,
    fontSize: 12,
  },
  rValue: {
    color: colors.textWhite,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  rValueBig: {
    color: colors.textWhite,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  rValueCode: {
    color: colors.purpleLightText,
    fontSize: 12,
    fontWeight: typography.weights.medium,
    letterSpacing: 0.5,
  },
});
