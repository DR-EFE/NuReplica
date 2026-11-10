import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { NuLogo } from '../components/NuLogo';
import { colors, radii, spacing, typography } from '../theme';

interface LockScreenProps {
  onUnlock?: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleBiometricAuth = async () => {
    try {
      setIsAuthenticating(true);
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Ingresa con rostro o huella',
          fallbackLabel: 'Ingresar con contraseña',
          cancelLabel: 'Cancelar',
          disableDeviceFallback: false,
        });

        if (result.success) {
          proceedUnlock();
          return;
        }
      } else {
        // Fallback for devices/emulators without enrolled fingerprint
        proceedUnlock();
      }
    } catch {
      proceedUnlock();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const proceedUnlock = () => {
    if (onUnlock) {
      onUnlock();
    } else {
      router.replace('/home' as any);
    }
  };

  const handlePasswordLogin = () => {
    Alert.prompt
      ? Alert.prompt(
          'Ingresar contraseña',
          'Introduce tu contraseña de acceso a Nu',
          (text) => {
            if (text) proceedUnlock();
          },
          'secure-text'
        )
      : proceedUnlock();
  };

  useEffect(() => {
    // Automatically request fingerprint / biometrics when screen opens as in official Nu app
    const timer = setTimeout(() => {
      handleBiometricAuth();
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        {/* Upper spacing */}
        <View style={styles.topSpacer} />

        {/* Center Section: Logo, Phone Lock Icon, and Message */}
        <View style={styles.centerSection}>
          <View style={styles.logoRow}>
            {/* White Nu Logo from NU.D.svg */}
            <NuLogo width={100} height={55} color="#FFFFFF" />

            {/* Phone Lock Icon */}
            <View style={styles.lockIconContainer}>
              <MaterialCommunityIcons
                name="cellphone-lock"
                size={34}
                color="#FFFFFF"
              />
            </View>
          </View>

          {/* Security explanation text */}
          <Text style={styles.messageText}>
            Hola, Felipe, por tu seguridad{'\n'}cerramos la sesión cuando hay 5{'\n'}minutos de inactividad.
          </Text>
        </View>

        {/* Lower Spacing */}
        <View style={styles.middleSpacer} />

        {/* Bottom Actions Section */}
        <View style={styles.bottomSection}>
          {/* Main White Pill Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleBiometricAuth}
            disabled={isAuthenticating}
            style={styles.biometricButton}
          >
            <Text style={styles.biometricButtonText}>
              Ingresar con rostro o huella
            </Text>
          </TouchableOpacity>

          {/* Secondary Plain Text Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePasswordLogin}
            style={styles.passwordButton}
          >
            <Text style={styles.passwordButtonText}>
              Ingresar con contraseña
            </Text>
          </TouchableOpacity>

          {/* Institutional Footer */}
          <Text style={styles.footerText}>
            Nubank S.A., Institución de Banca Múltiple
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#530789',
  },
  container: {
    flex: 1,
    backgroundColor: '#530789',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  topSpacer: {
    flex: 1.2,
  },
  centerSection: {
    gap: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 6,
  },
  lockIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 18.5,
    lineHeight: 27,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  middleSpacer: {
    flex: 2,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 16,
    width: '100%',
  },
  biometricButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.full,
    paddingVertical: 17,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  biometricButtonText: {
    color: '#530789',
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  passwordButton: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  passwordButtonText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: typography.fontFamily,
    marginTop: 14,
    textAlign: 'center',
  },
});
