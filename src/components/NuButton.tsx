import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, radii, typography } from '../theme';

interface NuButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'pill' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'default' | 'small' | 'large';
}

export const NuButton: React.FC<NuButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  size = 'default',
}) => {
  const getBackgroundColor = () => {
    if (disabled) {
      return variant === 'primary' ? 'rgba(130, 10, 209, 0.4)' : colors.surfacePill;
    }
    switch (variant) {
      case 'primary':
        return colors.primaryMain;
      case 'secondary':
        return colors.surfacePill;
      case 'pill':
        return colors.surfacePill;
      case 'outline':
        return 'transparent';
      default:
        return colors.primaryMain;
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return 'rgba(255, 255, 255, 0.5)';
    }
    switch (variant) {
      case 'outline':
        return colors.primaryLight;
      default:
        return colors.textWhite;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: size === 'small' ? 9 : size === 'large' ? 16 : 13,
          paddingHorizontal: size === 'small' ? 16 : size === 'large' ? 24 : 20,
        },
        variant === 'outline' && styles.outline,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.textWhite} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: size === 'small' ? typography.sizes.sm : typography.sizes.base,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.primaryMain,
  },
  text: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  },
});
