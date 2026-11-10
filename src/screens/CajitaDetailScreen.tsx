import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';
import { useAccount } from '../context/AccountContext';

export const CajitaDetailScreen: React.FC = () => {
  const router = useRouter();
  const { type, id } = useLocalSearchParams<{ type?: string; id?: string }>();
  const { cajitas } = useAccount();

  // Find cajita or use fallback
  const cajita =
    cajitas.find((c) => c.id === id || c.type === type) ||
    (type === 'turbo' ? cajitas[0] : cajitas[1]) ||
    cajitas[0];

  const isTurbo = cajita.type === 'turbo';

  const formatMoney = (val: number) =>
    `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleAction = (name: string) => {
    Alert.alert(name, `Acción sobre ${cajita.name} (modo prototipo NuDS)`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.iconBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={26} color={colors.textWhite} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleAction('Información de Cajita')}
            style={styles.iconBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="help-circle-outline" size={26} color={colors.textWhite} />
          </TouchableOpacity>

          {!isTurbo && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleAction('Configurar Cajita')}
              style={styles.iconBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Feather name="settings" size={22} color={colors.textWhite} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Central Graphic Illustration */}
        <View style={styles.graphicSection}>
          {isTurbo ? (
            <View style={styles.coinGraphicContainer}>
              <View style={styles.coinGlow} />
              <View style={styles.coinCircle}>
                <MaterialCommunityIcons name="currency-usd" size={54} color="#C472FB" />
              </View>
            </View>
          ) : (
            <View style={styles.boxGraphicContainer}>
              <View style={styles.boxTrail} />
              <MaterialCommunityIcons name="package-variant-closed" size={72} color="#C472FB" />
            </View>
          )}
        </View>

        {/* Title and Balance */}
        <View style={styles.titleSection}>
          <Text style={styles.cajitaTitle}>{cajita.name}</Text>

          <View style={styles.totalBlock}>
            <Text style={styles.label}>Saldo total</Text>
            <Text style={styles.totalAmount}>{formatMoney(cajita.balance)}</Text>
          </View>
        </View>

        {/* Available Balance Row */}
        <View style={styles.rateCardRow}>
          <View style={styles.rateCardLeft}>
            <Text style={styles.subLabel}>Saldo disponible siempre</Text>
            <View style={styles.amountYieldRow}>
              <Text style={styles.rowAmount}>{formatMoney(cajita.balance)}</Text>
              <View style={styles.yieldTag}>
                <Ionicons name="arrow-up" size={14} color={colors.success} />
                <Text style={styles.yieldTagText}>{formatMoney(cajita.yieldAmount)}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.rateValue}>{cajita.rate}</Text>
        </View>

        {/* Frozen Balance Row (if not turbo) */}
        {!isTurbo && (
          <>
            <View style={styles.divider} />

            <View style={styles.rateCardRow}>
              <View style={styles.rateCardLeft}>
                <Text style={styles.subLabel}>Saldo congelado</Text>
                <Text style={styles.rowAmount}>$0.00</Text>
              </View>

              <Text style={styles.rateValueSecondary}>
                {cajita.frozenRate || 'hasta 6.80%'}
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom Circular Actions */}
      <View style={styles.bottomActionsBar}>
        {/* Action 1: Agregar */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleAction('Agregar dinero a Cajita')}
          style={styles.actionCol}
        >
          <View style={[styles.actionCircle, styles.purpleCircle]}>
            <MaterialCommunityIcons name="cash-plus" size={28} color={colors.textWhite} />
          </View>
          <Text style={styles.actionText}>Agregar</Text>
        </TouchableOpacity>

        {/* Action 2: Retirar */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleAction('Retirar dinero de Cajita')}
          style={styles.actionCol}
        >
          <View style={[styles.actionCircle, styles.greyCircle]}>
            <MaterialCommunityIcons name="cash-minus" size={28} color={colors.textWhite} />
          </View>
          <Text style={styles.actionText}>Retirar</Text>
        </TouchableOpacity>

        {/* Action 3: Congelar (only on non-turbo) */}
        {!isTurbo && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleAction('Congelar saldo para mayor rendimiento')}
            style={styles.actionCol}
          >
            <View style={[styles.actionCircle, styles.freezeCircle]}>
              <MaterialCommunityIcons name="snowflake" size={26} color="#7AC2FA" />
            </View>
            <Text style={styles.actionText}>Congelar</Text>
          </TouchableOpacity>
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
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconBtn: {
    padding: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 40,
  },
  graphicSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    marginTop: 10,
    marginBottom: 20,
  },
  coinGraphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  coinGlow: {
    position: 'absolute',
    bottom: -15,
    width: 80,
    height: 50,
    backgroundColor: 'rgba(196, 114, 251, 0.25)',
    borderRadius: 25,
    filter: 'blur(10px)' as any,
  },
  coinCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(130, 10, 209, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(196, 114, 251, 0.35)',
  },
  boxGraphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  boxTrail: {
    position: 'absolute',
    top: -20,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(196, 114, 251, 0.15)',
    borderRadius: 20,
    transform: [{ rotate: '-45deg' }],
  },
  titleSection: {
    marginTop: 10,
    marginBottom: 32,
  },
  cajitaTitle: {
    color: colors.textWhite,
    fontSize: 27,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    marginBottom: 24,
  },
  totalBlock: {
    gap: 6,
  },
  label: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily,
  },
  totalAmount: {
    color: colors.textWhite,
    fontSize: 34,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  rateCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  rateCardLeft: {
    gap: 6,
    flex: 1,
  },
  subLabel: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
  amountYieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowAmount: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  yieldTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  yieldTagText: {
    color: colors.success,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  rateValue: {
    color: colors.textWhite,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  rateValueSecondary: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  divider: {
    height: 1,
    backgroundColor: '#1C1C1E',
    marginVertical: 12,
  },
  bottomActionsBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: colors.background,
  },
  actionCol: {
    alignItems: 'center',
    gap: 8,
    minWidth: 70,
  },
  actionCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purpleCircle: {
    backgroundColor: colors.primaryMain,
  },
  greyCircle: {
    backgroundColor: '#262626',
  },
  freezeCircle: {
    backgroundColor: '#0F2642',
  },
  actionText: {
    color: colors.textWhite,
    fontSize: 13,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
});
