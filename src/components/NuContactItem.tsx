import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { Contact } from '../mock/data';

interface NuContactItemProps {
  contact: Contact;
  onPress: (contact: Contact) => void;
}

export const NuContactItem: React.FC<NuContactItemProps> = ({ contact, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(contact)}
      style={styles.container}
    >
      <View style={styles.avatarCircle}>
        <Text style={styles.initialsText}>{contact.initials}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.displayName}>{contact.displayName}</Text>
        <Text style={styles.subtitle}>{contact.bankSubtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.screenPadding,
    gap: 16,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceHover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    letterSpacing: 0.5,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  displayName: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  subtitle: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
});
