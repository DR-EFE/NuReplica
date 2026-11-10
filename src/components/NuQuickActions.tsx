import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';

interface ActionItem {
  id: string;
  title: string;
  iconName: string;
  iconLibrary: 'material' | 'feather';
  badge?: string;
  onPress: () => void;
}

interface NuQuickActionsProps {
  onPressTransfer: () => void;
  onPressReceive: () => void;
  onPressLoan: () => void;
  onPressCashOut: () => void;
}

export const NuQuickActions: React.FC<NuQuickActionsProps> = ({
  onPressTransfer,
  onPressReceive,
  onPressLoan,
  onPressCashOut,
}) => {
  const actions: ActionItem[] = [
    {
      id: 'receive',
      title: 'Recibir y\ndepositar',
      iconName: 'cash-plus',
      iconLibrary: 'material',
      onPress: onPressReceive,
    },
    {
      id: 'transfer',
      title: 'Transferir',
      iconName: 'cash-minus',
      iconLibrary: 'material',
      onPress: onPressTransfer,
    },
    {
      id: 'loan',
      title: 'Simular\npréstamo',
      iconName: 'hand-coin-outline',
      iconLibrary: 'material',
      badge: '$26,000',
      onPress: onPressLoan,
    },
    {
      id: 'cashout',
      title: 'Disponer de\nsaldo',
      iconName: 'currency-usd',
      iconLibrary: 'material',
      badge: '$13,600',
      onPress: onPressCashOut,
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {actions.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          onPress={item.onPress}
          style={styles.actionCol}
        >
          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              {item.iconLibrary === 'feather' ? (
                <Feather name={item.iconName as any} size={26} color={colors.textWhite} />
              ) : (
                <MaterialCommunityIcons
                  name={item.iconName as any}
                  size={26}
                  color={colors.textWhite}
                />
              )}
            </View>

            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </View>

          <Text style={styles.titleText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  actionCol: {
    alignItems: 'center',
    width: 76,
  },
  circleWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 8,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.surfaceHover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: colors.primaryMain,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: 10.5,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  titleText: {
    color: colors.textWhite,
    fontSize: 13,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: typography.fontFamily,
  },
});
