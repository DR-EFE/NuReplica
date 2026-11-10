import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../theme';
import { NuHeader } from '../components/NuHeader';
import { NuContactItem } from '../components/NuContactItem';
import { mockContacts, Contact } from '../mock/data';

export const RecipientScreen: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter((c) =>
    c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.bankSubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectContact = (contact: Contact) => {
    router.push({
      pathname: '/transfer/amount',
      params: {
        contactId: contact.id,
        contactName: contact.fullName,
        displayName: contact.displayName,
        bankName: contact.bankName,
        accountMasked: contact.accountMasked,
        fullAccountClabe: contact.fullAccountClabe,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* Header with 'X' Close icon */}
      <NuHeader type="close" onPress={() => router.back()} />

      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentHeader}>
          <Text style={styles.title}>¿A quién le envías{'\n'}dinero?</Text>

          <Text style={styles.subtitle}>
            Inserta un nombre, CLABE, tarjeta o celular
          </Text>

          {/* Search Input with Underline */}
          <View style={styles.inputContainer}>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Escribe aquí"
              placeholderTextColor={colors.placeholder}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Explanation Text */}
          <Text style={styles.infoText}>
            Para poder hacer la transferencia, guardaremos automáticamente los datos como un contacto.
          </Text>

          {/* Section Heading */}
          <Text style={styles.contactsHeader}>Contactos</Text>
        </View>

        {/* Contacts List */}
        <View style={styles.contactsList}>
          {filteredContacts.map((contact) => (
            <NuContactItem
              key={contact.id}
              contact={contact}
              onPress={handleSelectContact}
            />
          ))}

          {filteredContacts.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron contactos</Text>
            </View>
          )}
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentHeader: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 8,
  },
  title: {
    color: colors.textWhite,
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    lineHeight: 34,
    fontFamily: typography.fontFamily,
    marginBottom: 20,
  },
  subtitle: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    marginBottom: 8,
  },
  inputContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.borderUnderline,
    paddingVertical: 8,
    marginBottom: 16,
  },
  textInput: {
    color: colors.textWhite,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fontFamily,
    paddingVertical: 6,
  },
  infoText: {
    color: colors.mediumEmphasis,
    fontSize: 13.5,
    lineHeight: 20,
    fontFamily: typography.fontFamily,
    marginBottom: 28,
  },
  contactsHeader: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
    marginBottom: 8,
  },
  contactsList: {
    paddingBottom: 40,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.subtleEmphasis,
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
  },
});
