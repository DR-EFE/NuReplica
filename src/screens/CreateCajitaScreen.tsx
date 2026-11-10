import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';
import { useAccount } from '../context/AccountContext';

export const CreateCajitaScreen: React.FC = () => {
  const router = useRouter();
  const { createCajita } = useAccount();
  const [name, setName] = useState('');

  const maxLength = 50;
  const isInputValid = name.trim().length > 0;

  const handleConfirmCreate = () => {
    if (isInputValid) {
      createCajita(name.trim());
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* Header Bar */}
      <View style={styles.headerBar}>
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
          style={styles.iconBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <MaterialCommunityIcons name="image-plus" size={26} color={colors.textWhite} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top Graphic Illustration */}
        <View style={styles.graphicContainer}>
          <View style={styles.boxTrail} />
          <MaterialCommunityIcons name="package-variant-closed" size={80} color="#C472FB" />
        </View>

        {/* Input Section */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Ponle un nombre a tu Cajita</Text>

          <View style={styles.inputUnderlineBox}>
            <TextInput
              value={name}
              onChangeText={(text) => {
                if (text.length <= maxLength) setName(text);
              }}
              style={styles.textInput}
              placeholderTextColor={colors.placeholder}
              maxLength={maxLength}
              autoFocus={true}
              selectionColor={colors.primaryLight}
            />
          </View>

          {/* Character counter */}
          <Text style={styles.counterText}>
            {name.length}/{maxLength}
          </Text>
        </View>

        <View style={styles.spacer} />

        {/* Floating Right Arrow Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleConfirmCreate}
            disabled={!isInputValid}
            style={[
              styles.nextBtn,
              isInputValid ? styles.nextBtnActive : styles.nextBtnInactive,
            ]}
          >
            <Ionicons
              name="arrow-forward"
              size={26}
              color={isInputValid ? colors.textWhite : '#666666'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: 8,
    paddingBottom: 16,
  },
  iconBtn: {
    padding: 6,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  graphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    marginTop: 10,
    marginBottom: 40,
    position: 'relative',
  },
  boxTrail: {
    position: 'absolute',
    top: 0,
    width: 44,
    height: 44,
    backgroundColor: 'rgba(196, 114, 251, 0.15)',
    borderRadius: 22,
    transform: [{ rotate: '-45deg' }],
  },
  formSection: {
    gap: 12,
  },
  label: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
    marginBottom: 4,
  },
  inputUnderlineBox: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#333333',
    paddingBottom: 6,
  },
  textInput: {
    color: colors.textWhite,
    fontSize: 20,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
    paddingVertical: 4,
  },
  counterText: {
    color: colors.mediumEmphasis,
    fontSize: 13,
    textAlign: 'right',
    fontFamily: typography.fontFamily,
    marginTop: 4,
  },
  spacer: {
    flex: 1,
  },
  bottomBar: {
    alignItems: 'flex-end',
    paddingBottom: 28,
  },
  nextBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnInactive: {
    backgroundColor: '#262626',
  },
  nextBtnActive: {
    backgroundColor: colors.primaryMain,
    shadowColor: colors.primaryMain,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});
