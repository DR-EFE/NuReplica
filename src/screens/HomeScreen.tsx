import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../theme';
import { NuHomeHeader } from '../components/NuHomeHeader';
import { NuPromoBanner } from '../components/NuPromoBanner';
import { NuDebitCard } from '../components/NuDebitCard';
import { NuQuickActions } from '../components/NuQuickActions';
import { NuCreditCard } from '../components/NuCreditCard';
import { mockUser } from '../mock/data';
import { useAccount } from '../context/AccountContext';

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { balance, creditPositiveBalance, creditAvailableLimit, autoPayActive } = useAccount();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const handleToggleBalance = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  const handleTransfer = () => {
    router.push('/transfer/recipient');
  };

  const handleOpenDebitAccount = () => {
    router.push('/account/debit' as any);
  };

  const handleActionNotice = (actionName: string) => {
    Alert.alert('Acción', `${actionName} (prototipo NuDS)`);
  };

  const handleProfilePress = () => {
    Alert.alert(
      'Sesión de Nu',
      '¿Deseas bloquear la pantalla y requerir huella nuevamente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Bloquear app',
          style: 'destructive',
          onPress: () => router.replace('/'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header with greeting and action icons */}
        <NuHomeHeader
          greetingName={mockUser.greetingName}
          isBalanceVisible={isBalanceVisible}
          onToggleBalance={handleToggleBalance}
          onPressProfile={handleProfilePress}
          onPressHelp={() => handleActionNotice('Ayuda')}
          onPressInvite={() => handleActionNotice('Invitar amigos')}
        />

        {/* 2. Promo Banner */}
        <NuPromoBanner
          onPress={() => handleActionNotice('Beneficio MSI')}
        />

        {/* 3. Debit Card Section */}
        <NuDebitCard
          isBalanceVisible={isBalanceVisible}
          debitBalance={balance}
          onPress={handleOpenDebitAccount}
        />

        {/* 4. Quick Actions (Transferir, Recibir, etc.) */}
        <NuQuickActions
          onPressTransfer={handleTransfer}
          onPressReceive={() => handleActionNotice('Recibir y depositar')}
          onPressLoan={() => handleActionNotice('Simular préstamo')}
          onPressCashOut={() => handleActionNotice('Disponer de saldo')}
        />

        {/* 5. Credit Card Section & My Cards */}
        <NuCreditCard
          isBalanceVisible={isBalanceVisible}
          creditPositiveBalance={mockUser.creditPositiveBalance}
          creditAvailableLimit={mockUser.creditAvailableLimit}
          autoPayActive={mockUser.autoPayActive}
          onPressCredit={() => handleActionNotice('Tarjeta de crédito')}
          onPressDeferPurchases={() => handleActionNotice('Diferir compras')}
          onPressMyCards={() => handleActionNotice('Mis tarjetas')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
