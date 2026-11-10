import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

interface NuHomeHeaderProps {
  greetingName: string;
  isBalanceVisible: boolean;
  onToggleBalance: () => void;
  onPressProfile?: () => void;
  onPressHelp?: () => void;
  onPressInvite?: () => void;
}

export const NuHomeHeader: React.FC<NuHomeHeaderProps> = ({
  greetingName,
  isBalanceVisible,
  onToggleBalance,
  onPressProfile,
  onPressHelp,
  onPressInvite,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        {/* Profile Circle with Purple Notification Dot */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressProfile}
          style={styles.profileButton}
        >
          <View style={styles.profileCircle}>
            <Ionicons name="image-outline" size={20} color={colors.textWhite} />
          </View>
          <View style={styles.notificationDot} />
        </TouchableOpacity>

        {/* Greeting */}
        <Text style={styles.greetingText}>Hola, {greetingName}</Text>
      </View>

      {/* Right Icons */}
      <View style={styles.rightIconsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleBalance}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isBalanceVisible ? 'eye-outline' : 'eye-off-outline'}
            size={22}
            color={colors.textWhite}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressHelp}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="help-circle-outline" size={24} color={colors.textWhite} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressInvite}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="person-add-outline" size={22} color={colors.textWhite} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileButton: {
    position: 'relative',
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceHover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.background,
  },
  greetingText: {
    color: colors.textWhite,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  rightIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconButton: {
    padding: 2,
  },
});
