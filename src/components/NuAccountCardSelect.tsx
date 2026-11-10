import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';
import { TransferSource } from '../mock/data';

interface NuAccountCardSelectProps {
  sources: TransferSource[];
  selectedSourceId: string;
  onSelectSource: (id: 'debit' | 'credit') => void;
}

export const NuAccountCardSelect: React.FC<NuAccountCardSelectProps> = ({
  sources,
  selectedSourceId,
  onSelectSource,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Transfiriendo con</Text>

      <View style={styles.cardsRow}>
        {sources.map((src) => {
          const isSelected = selectedSourceId === src.id;

          return (
            <TouchableOpacity
              key={src.id}
              activeOpacity={0.8}
              onPress={() => onSelectSource(src.id as 'debit' | 'credit')}
              style={[
                styles.card,
                isSelected ? styles.cardSelected : styles.cardUnselected,
              ]}
            >
              {/* Badge if present */}
              {src.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{src.badge}</Text>
                </View>
              )}

              {/* Icon */}
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={src.id === 'debit' ? 'cash' : 'credit-card-outline'}
                  size={26}
                  color={isSelected ? colors.primaryLight : colors.textWhite}
                />
              </View>

              {/* Title */}
              <Text
                style={[
                  styles.cardTitle,
                  isSelected && styles.cardTitleSelected,
                ]}
              >
                {src.title}
              </Text>

              {/* Amount */}
              <Text style={styles.cardAmount}>{src.amountFormatted}</Text>

              {/* Subtitle */}
              <Text
                style={[
                  styles.cardSubtitle,
                  isSelected && styles.cardSubtitleSelected,
                ]}
              >
                {src.subtitle}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: 28,
  },
  sectionLabel: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    fontFamily: typography.fontFamily,
    marginBottom: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    minHeight: 140,
    borderRadius: radii.card,
    padding: 16,
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardUnselected: {
    backgroundColor: colors.surfaceCard,
    borderWidth: 1.2,
    borderColor: colors.borderDefault,
  },
  cardSelected: {
    backgroundColor: colors.surfaceCard,
    borderWidth: 2,
    borderColor: colors.primaryMain,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.primaryMain,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.xs,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  iconContainer: {
    marginBottom: 12,
  },
  cardTitle: {
    color: colors.textWhite,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
    marginBottom: 4,
  },
  cardTitleSelected: {
    color: colors.primaryLight,
  },
  cardAmount: {
    color: colors.textWhite,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    marginBottom: 4,
  },
  cardSubtitle: {
    color: colors.mediumEmphasis,
    fontSize: 12,
    fontFamily: typography.fontFamily,
  },
  cardSubtitleSelected: {
    color: colors.purpleLightText,
  },
});
