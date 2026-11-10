import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';

interface NuPromoBannerProps {
  onPress?: () => void;
}

export const NuPromoBanner: React.FC<NuPromoBannerProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="gift-open-outline" size={32} color={colors.textWhite} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          ¡Tus compras a MSI pueden{'\n'}obtener recompensas en Nuvi...
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.xxl,
    backgroundColor: colors.primaryMain,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: colors.textWhite,
    fontSize: 13.5,
    lineHeight: 18,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
});
