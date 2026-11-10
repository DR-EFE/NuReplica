import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';
import { useAccount } from '../context/AccountContext';

export const DebitAccountScreen: React.FC = () => {
  const router = useRouter();
  const { balance, transactions, cajitasTotal, cajitasYield } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAction = (name: string) => {
    Alert.alert('Acción Nu', `${name} (prototipo NuDS)`);
  };

  const formatMoney = (val: number) =>
    `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Default initial movement seen in screenshot
  const initialMovements = [
    {
      id: 'init_1',
      title: 'Nu',
      subtitle: 'Compensación de intereses Nu',
      amount: 0.01,
      date: '08 NOV 2026',
      type: 'incoming',
    },
    ...transactions,
  ];

  const filteredMovements = initialMovements.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* Top Header: Back Arrow and Help Circle */}
      <View style={styles.header}>
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
          onPress={() => handleAction('Centro de ayuda')}
          style={styles.iconBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="help-circle-outline" size={26} color={colors.textWhite} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Saldo disponible */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Saldo disponible</Text>
          <Text style={styles.balanceAmount}>{formatMoney(balance)}</Text>
        </View>

        {/* 2. Dinero en tus Cajitas */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => router.push('/account/cajitas' as any)}
          style={styles.cajitasRow}
        >
          <View style={styles.cajitasLeft}>
            <View style={styles.cajitasIconBox}>
              <MaterialCommunityIcons name="archive-outline" size={24} color={colors.textWhite} />
            </View>

            <View style={styles.cajitasTexts}>
              <Text style={styles.cajitasTitle}>Dinero en tus Cajitas</Text>
              <Text style={styles.cajitasAmount}>{formatMoney(cajitasTotal)}</Text>
              <View style={styles.yieldRow}>
                <Ionicons name="arrow-up" size={14} color={colors.success} />
                <Text style={styles.yieldText}>{formatMoney(cajitasYield)}</Text>
              </View>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.mediumEmphasis} />
        </TouchableOpacity>

        {/* 3. Quick Actions Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionsCarousel}
        >
          {/* Action 1: Recibir y depositar */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleAction('Recibir y depositar')}
            style={styles.actionCol}
          >
            <View style={styles.actionCircle}>
              <MaterialCommunityIcons name="cash-plus" size={26} color={colors.textWhite} />
            </View>
            <Text style={styles.actionTitle}>Recibir y{'\n'}depositar</Text>
          </TouchableOpacity>

          {/* Action 2: Transferir */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/transfer/recipient')}
            style={styles.actionCol}
          >
            <View style={styles.actionCircle}>
              <MaterialCommunityIcons name="cash-minus" size={26} color={colors.textWhite} />
            </View>
            <Text style={styles.actionTitle}>Transferir</Text>
          </TouchableOpacity>

          {/* Action 3: Pagar servicios */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleAction('Pagar servicios')}
            style={styles.actionCol}
          >
            <View style={styles.actionCircle}>
              <MaterialCommunityIcons name="receipt-text-outline" size={26} color={colors.textWhite} />
            </View>
            <Text style={styles.actionTitle}>Pagar{'\n'}servicios</Text>
          </TouchableOpacity>

          {/* Action 4: Recargar celular */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleAction('Recargar celular')}
            style={styles.actionCol}
          >
            <View style={styles.actionCircle}>
              <Feather name="phone" size={24} color={colors.textWhite} />
            </View>
            <Text style={styles.actionTitle}>Recargar{'\n'}celular</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* 4. Indigo Promo Banner: ¡Nunca más olvides un pago! */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleAction('Organizador de pagos Nu')}
          style={styles.indigoBanner}
        >
          <View style={styles.indigoBannerTextCol}>
            <Text style={styles.indigoBannerTitle}>¡Nunca más olvides un pago!</Text>
            <Text style={styles.indigoBannerSubtitle}>
              Dinos qué servicios pagas y te{'\n'}ayudamos a organizarte.
            </Text>
          </View>

          <View style={styles.receiptIconBadge}>
            <MaterialCommunityIcons name="receipt" size={28} color="#D8DAFA" />
          </View>
        </TouchableOpacity>

        {/* 5. Movimientos Section */}
        <View style={styles.movementsSection}>
          <Text style={styles.movementsTitle}>Movimientos</Text>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.mediumEmphasis} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar"
              placeholderTextColor={colors.placeholder}
              style={styles.searchInput}
            />
          </View>

          {/* List of Movements */}
          <View style={styles.movementsList}>
            {filteredMovements.map((item) => {
              const isPositive = item.amount > 0;
              return (
                <View key={item.id} style={styles.movementItem}>
                  <View style={styles.movementLeft}>
                    <View
                      style={[
                        styles.movementIconCircle,
                        isPositive ? styles.incomeIconCircle : styles.expenseIconCircle,
                      ]}
                    >
                      <Ionicons
                        name={isPositive ? 'add' : 'arrow-up'}
                        size={20}
                        color={isPositive ? colors.success : colors.textWhite}
                      />
                    </View>

                    <View style={styles.movementTexts}>
                      <Text style={styles.movementItemTitle}>{item.title}</Text>
                      <Text style={styles.movementItemSubtitle} numberOfLines={1}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.movementRight}>
                    <Text
                      style={[
                        styles.movementAmount,
                        isPositive && styles.movementIncomeAmount,
                      ]}
                    >
                      {isPositive ? `+$${item.amount.toFixed(2)}` : `-$${Math.abs(item.amount).toFixed(2)}`}
                    </Text>
                    <Text style={styles.movementDate}>{item.date}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  iconBtn: {
    padding: 6,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  balanceSection: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: 6,
    marginBottom: 24,
  },
  balanceLabel: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily,
    marginBottom: 6,
  },
  balanceAmount: {
    color: colors.textWhite,
    fontSize: 34,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    letterSpacing: -0.5,
  },
  cajitasRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: 14,
    marginBottom: 16,
  },
  cajitasLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  cajitasIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  cajitasTexts: {
    gap: 4,
  },
  cajitasTitle: {
    color: colors.mediumEmphasis,
    fontSize: 14.5,
    fontFamily: typography.fontFamily,
  },
  cajitasAmount: {
    color: colors.textWhite,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  yieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  yieldText: {
    color: colors.success,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  actionsCarousel: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: 12,
    gap: 14,
    marginBottom: 16,
  },
  actionCol: {
    alignItems: 'center',
    width: 76,
  },
  actionCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.surfaceHover,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    color: colors.textWhite,
    fontSize: 12.5,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: typography.fontFamily,
  },
  indigoBanner: {
    backgroundColor: '#272B6B',
    marginHorizontal: spacing.screenPadding,
    borderRadius: radii.card,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  indigoBannerTextCol: {
    flex: 1,
    gap: 6,
    paddingRight: 12,
  },
  indigoBannerTitle: {
    color: colors.textWhite,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  indigoBannerSubtitle: {
    color: '#D8DAFA',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: typography.fontFamily,
  },
  receiptIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movementsSection: {
    paddingHorizontal: spacing.screenPadding,
  },
  movementsTitle: {
    color: colors.textWhite,
    fontSize: 22,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHover,
    borderRadius: radii.full,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily,
  },
  movementsList: {
    gap: 16,
  },
  movementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  movementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  movementIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeIconCircle: {
    backgroundColor: 'rgba(26, 174, 92, 0.18)',
  },
  expenseIconCircle: {
    backgroundColor: colors.surfaceHover,
  },
  movementTexts: {
    flex: 1,
    gap: 2,
  },
  movementItemTitle: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  movementItemSubtitle: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
  movementRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  movementAmount: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  movementIncomeAmount: {
    color: colors.success,
  },
  movementDate: {
    color: colors.mediumEmphasis,
    fontSize: 12,
    fontFamily: typography.fontFamily,
  },
});
