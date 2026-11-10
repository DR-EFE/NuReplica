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
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';
import { useAccount } from '../context/AccountContext';

export const CajitasScreen: React.FC = () => {
  const router = useRouter();
  const { cajitas, cajitasTotal, cajitasYield } = useAccount();

  const formatMoney = (val: number) =>
    `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleOpenDetail = (id: string, type: string) => {
    router.push({
      pathname: '/account/cajita-detail' as any,
      params: { id, type },
    });
  };

  const handleCreateCajita = () => {
    router.push('/account/cajita-create' as any);
  };

  const handleHelpPress = () => {
    Alert.alert('Rendimiento en Cajitas', 'Tu dinero crece diariamente con una tasa fija anual calculada al día.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* 1. Purple Upper Header & Balance Card */}
      <View style={styles.purpleHeaderContainer}>
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            style={styles.iconBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="chevron-back" size={26} color={colors.textWhite} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleHelpPress}
            style={styles.iconBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="help-circle-outline" size={26} color={colors.textWhite} />
          </TouchableOpacity>
        </View>

        {/* Total en Cajitas */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total en Cajitas</Text>
          <Text style={styles.totalAmount}>{formatMoney(cajitasTotal)}</Text>
        </View>

        {/* Growth & Yield Indicator */}
        <View style={styles.yieldSection}>
          <View style={styles.yieldHeaderRow}>
            <Text style={styles.yieldLabel}>Así ha crecido tu saldo en Cajitas</Text>
            <TouchableOpacity onPress={handleHelpPress}>
              <Ionicons name="help-circle-outline" size={18} color="#C4B5D6" />
            </TouchableOpacity>
          </View>
          <View style={styles.yieldAmountRow}>
            <Ionicons name="arrow-up" size={22} color={colors.success} />
            <Text style={styles.yieldAmount}>{formatMoney(cajitasYield)}</Text>
          </View>
        </View>
      </View>

      {/* 2. Black Body with Cajitas List */}
      <ScrollView
        style={styles.blackBody}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cajitas.map((c) => {
          const isTurbo = c.type === 'turbo';
          return (
            <React.Fragment key={c.id}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => handleOpenDetail(c.id, c.type)}
                style={styles.cajitaCard}
              >
                {/* Left Icon Graphic */}
                <View style={styles.iconGraphicContainer}>
                  <View style={isTurbo ? styles.coinGraphicBox : styles.boxGraphicBox}>
                    <MaterialCommunityIcons
                      name={isTurbo ? 'currency-usd' : 'package-variant-closed'}
                      size={38}
                      color="#C472FB"
                    />
                  </View>
                  <View style={styles.rateBadge}>
                    <Text style={styles.rateBadgeText}>{c.rate}</Text>
                  </View>
                </View>

                {/* Texts Info */}
                <View style={styles.cajitaInfoCol}>
                  <Text style={styles.cajitaName}>{c.name}</Text>
                  <Text style={styles.cajitaBalance}>{formatMoney(c.balance)}</Text>
                  <View style={styles.cajitaYieldRow}>
                    <Ionicons name="arrow-up" size={14} color={colors.success} />
                    <Text style={styles.cajitaYieldText}>{formatMoney(c.yieldAmount)}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.cardDivider} />
            </React.Fragment>
          );
        })}
      </ScrollView>

      {/* Floating Action Button '+' */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleCreateCajita}
        style={styles.fab}
      >
        <Ionicons name="add" size={30} color={colors.textWhite} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#27114A',
  },
  purpleHeaderContainer: {
    backgroundColor: '#27114A',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 8,
    paddingBottom: 28,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBtn: {
    padding: 6,
  },
  totalSection: {
    marginBottom: 20,
    gap: 4,
  },
  totalLabel: {
    color: '#C4B5D6',
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily,
  },
  totalAmount: {
    color: colors.textWhite,
    fontSize: 34,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    letterSpacing: -0.5,
  },
  yieldSection: {
    gap: 6,
  },
  yieldHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  yieldLabel: {
    color: '#C4B5D6',
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
  yieldAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  yieldAmount: {
    color: colors.success,
    fontSize: 24,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  blackBody: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 90,
  },
  cajitaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: 18,
    gap: 20,
  },
  iconGraphicContainer: {
    width: 68,
    height: 68,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinGraphicBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: 'rgba(130, 10, 209, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxGraphicBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: 'rgba(130, 10, 209, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateBadge: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    backgroundColor: '#530789',
    borderRadius: radii.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  rateBadgeText: {
    color: colors.textWhite,
    fontSize: 10.5,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  cajitaInfoCol: {
    flex: 1,
    gap: 4,
  },
  cajitaName: {
    color: colors.textWhite,
    fontSize: 16.5,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  cajitaBalance: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    marginTop: 2,
  },
  cajitaYieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  cajitaYieldText: {
    color: colors.success,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#1C1C1E',
    marginHorizontal: spacing.screenPadding,
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryMain,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryMain,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});
