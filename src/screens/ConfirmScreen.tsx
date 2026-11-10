import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';
import { NuHeader } from '../components/NuHeader';
import { NuButton } from '../components/NuButton';

export const ConfirmScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    amount?: string;
    recipientName?: string;
    bankName?: string;
    fullAccountClabe?: string;
    sourceType?: string;
  }>();

  const amount = params.amount || '0.01';
  const recipientName = params.recipientName || 'Ramos Velázquez Felipe';
  const bankName = params.bankName || 'BBVA MEXICO';
  const fullAccountClabe = params.fullAccountClabe || '0121 8001 5025 927922';
  const sourceType = params.sourceType || 'Cuenta de débito';

  const [message, setMessage] = useState<string>('');
  const [referenceNum, setReferenceNum] = useState<string>('81126');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleEditAmount = () => {
    router.back();
  };

  const handleEditMessage = () => {
    Alert.prompt
      ? Alert.prompt('Mensaje', 'Escribe un concepto o mensaje para la transferencia', (text) =>
          setMessage(text)
        )
      : Alert.alert('Mensaje', 'Concepto: Pago de prueba Nu');
  };

  const handleEditReference = () => {
    Alert.alert('Referencia', 'Número de referencia bancaria SPEI: 81126');
  };

  const handleConfirmTransfer = () => {
    router.push({
      pathname: '/transfer/pin',
      params: {
        amount,
        recipientName,
        bankName,
        fullAccountClabe,
        sourceType,
      },
    });
  };

  const handleFinish = () => {
    setIsSuccessModalVisible(false);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* Header back button */}
      <NuHeader type="back" onPress={() => router.back()} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Estás a punto de enviar</Text>
        </View>

        {/* Amount & Source Card Row with Edit Pencil */}
        <View style={styles.amountSourceRow}>
          <View>
            <Text style={styles.amountText}>${amount}</Text>
            <Text style={styles.sourceText}>{sourceType}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleEditAmount}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="pencil-outline" size={24} color={colors.primaryLight} />
          </TouchableOpacity>
        </View>

        {/* Center Divider with Down Arrow */}
        <View style={styles.dividerWithArrow}>
          <View style={styles.dividerLine} />
          <View style={styles.arrowBadge}>
            <Ionicons name="arrow-down" size={16} color={colors.mediumEmphasis} />
          </View>
          <View style={styles.dividerLine} />
        </View>

        {/* Recipient Information */}
        <View style={styles.recipientSection}>
          <Text style={styles.recipientNameText}>{recipientName}</Text>
          <Text style={styles.bankNameText}>{bankName}</Text>
          <Text style={styles.clabeText}>{fullAccountClabe}</Text>
        </View>

        <View style={styles.fullDivider} />

        {/* Metadata Rows: Cuándo */}
        <View style={styles.metaRow}>
          <View style={styles.metaTextCol}>
            <Text style={styles.metaLabel}>Cuándo</Text>
            <Text style={styles.metaValue}>Ahora, sin repetir</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="calendar-outline" size={24} color={colors.primaryLight} />
          </TouchableOpacity>
        </View>

        {/* Metadata Rows: Agrega un mensaje */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleEditMessage}
          style={styles.metaRow}
        >
          <View style={styles.metaTextCol}>
            <Text style={styles.messageLabel}>
              {message ? `Mensaje: ${message}` : 'Agrega un mensaje'}
            </Text>
          </View>
          <Ionicons name="add" size={26} color={colors.primaryLight} />
        </TouchableOpacity>

        {/* Metadata Rows: Número de referencia */}
        <View style={styles.metaRow}>
          <View style={styles.metaTextCol}>
            <Text style={styles.metaLabel}>Número de referencia</Text>
            <Text style={styles.metaValue}>{referenceNum}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleEditReference}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="pencil-outline" size={24} color={colors.primaryLight} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomInfoCol}>
          <Text style={styles.bottomAmount}>${amount}</Text>
          <Text style={styles.bottomSubtext}>Esta transferencia es{'\n'}gratuita</Text>
        </View>

        <NuButton
          title="Continuar"
          variant="primary"
          loading={isSubmitting}
          onPress={handleConfirmTransfer}
          style={styles.bottomContinueBtn}
        />
      </View>

      {/* Success Modal (Simulated transfer completion) */}
      <Modal
        visible={isSuccessModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleFinish}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark" size={38} color={colors.textWhite} />
            </View>

            <Text style={styles.modalTitle}>¡Transferencia exitosa!</Text>
            <Text style={styles.modalAmount}>${amount}</Text>

            <View style={styles.receiptBox}>
              <Text style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Para: </Text>
                <Text style={styles.receiptValue}>{recipientName}</Text>
              </Text>
              <Text style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Banco: </Text>
                <Text style={styles.receiptValue}>{bankName}</Text>
              </Text>
              <Text style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>CLABE: </Text>
                <Text style={styles.receiptValue}>{fullAccountClabe}</Text>
              </Text>
              <Text style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Referencia: </Text>
                <Text style={styles.receiptValue}>{referenceNum}</Text>
              </Text>
              <Text style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Origen: </Text>
                <Text style={styles.receiptValue}>{sourceType}</Text>
              </Text>
            </View>

            <NuButton
              title="Volver al inicio"
              variant="primary"
              size="large"
              onPress={handleFinish}
              style={{ width: '100%', marginTop: 24 }}
            />
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    paddingBottom: 32,
  },
  titleSection: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: 8,
    marginBottom: 24,
  },
  mainTitle: {
    color: colors.textWhite,
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  amountSourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    marginBottom: 16,
  },
  amountText: {
    color: colors.purpleLightText,
    fontSize: 26,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  sourceText: {
    color: colors.purpleLightText,
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    marginTop: 2,
  },
  dividerWithArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderDefault,
  },
  arrowBadge: {
    paddingHorizontal: 8,
  },
  recipientSection: {
    paddingHorizontal: spacing.screenPadding,
    marginVertical: 14,
    gap: 4,
  },
  recipientNameText: {
    color: colors.purpleLightText,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  bankNameText: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  clabeText: {
    color: colors.textWhite,
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    letterSpacing: 0.8,
  },
  fullDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginTop: 20,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  metaTextCol: {
    gap: 4,
  },
  metaLabel: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
  metaValue: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    fontFamily: typography.fontFamily,
  },
  messageLabel: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    backgroundColor: colors.background,
  },
  bottomInfoCol: {
    gap: 2,
  },
  bottomAmount: {
    color: colors.textWhite,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
  },
  bottomSubtext: {
    color: colors.mediumEmphasis,
    fontSize: 12.5,
    lineHeight: 16,
    fontFamily: typography.fontFamily,
  },
  bottomContinueBtn: {
    minWidth: 130,
    paddingHorizontal: 28,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.card,
    borderTopRightRadius: radii.card,
    padding: spacing.xxl,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: colors.textWhite,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    marginBottom: 6,
  },
  modalAmount: {
    color: colors.primaryLight,
    fontSize: typography.sizes.huge,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily,
    marginBottom: 20,
  },
  receiptBox: {
    width: '100%',
    backgroundColor: colors.surfaceHover,
    borderRadius: radii.md,
    padding: 16,
    gap: 8,
  },
  receiptRow: {
    fontFamily: typography.fontFamily,
  },
  receiptLabel: {
    color: colors.mediumEmphasis,
    fontSize: typography.sizes.sm,
  },
  receiptValue: {
    color: colors.textWhite,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },
});
