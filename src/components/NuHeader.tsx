import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../theme';

interface NuHeaderProps {
  type?: 'back' | 'close';
  onPress?: () => void;
  title?: string;
  rightAction?: React.ReactNode;
}

export const NuHeader: React.FC<NuHeaderProps> = ({
  type = 'back',
  onPress,
  title,
  rightAction,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={styles.iconButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        {type === 'close' ? (
          <Ionicons name="close" size={26} color={colors.textWhite} />
        ) : (
          <Ionicons name="chevron-back" size={26} color={colors.textWhite} />
        )}
      </TouchableOpacity>

      {title ? <Text style={styles.title}>{title}</Text> : <View style={{ flex: 1 }} />}

      <View style={styles.rightSlot}>{rightAction}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  },
  rightSlot: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
});
