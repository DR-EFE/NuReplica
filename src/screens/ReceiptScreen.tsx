import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useAccount } from '../context/AccountContext';

export const ReceiptScreen: React.FC = () => {
  const router = useRouter();
  const { lastReceipt } = useAccount();
  const receiptRef = useRef<any>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);

  // Fallback data if accessed directly
  const receipt = lastReceipt || {
    id: '6af15701-a798-4773-a007-c5c0d4b37a78',
    authorizationDate: 'Autorización 08 NOV 2026,\n11:15:53 PM (hora de CDMX)',
    amount: 0.01,
    transferType: 'SPEI',
    concept: 'Transferencia',
    referenceNumber: '81126',
    folio: 'QWW2ZQMWG',
    destinationName: 'Ramos Velázquez Felipe',
    destinationVerificationNote: 'Dato no verificado por Nu',
    destinationBank: 'BBVA MEXICO',
    destinationClabe: '••••7922',
    status: 'Aceptada',
    trackingKey: 'NU3AU5BG267K8MCPRE9208CJBODO',
    originName: 'Felipe Ramos Velázquez',
    originBank: 'Nubank',
    originClabe: '••••2360',
    institutionName: 'Nubank S.A., Institución de Banca Múltiple',
    internalReference: '6af15701-a798-4773-a007-c5c0d4b37a78',
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);

      if (receiptRef.current) {
        // Capture the full vertical strip element as an image
        const uri = await captureRef(receiptRef, {
          format: 'png',
          quality: 1.0,
          result: 'tmpfile',
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, {
            mimeType: 'image/png',
            dialogTitle: 'Comprobante de transferencia Nu',
            UTI: 'public.png',
          });
          setIsSharing(false);
          return;
        }
      }

      // Fallback for Web or environments without native file sharing
      await Share.share({
        message: `Comprobante de transferencia Nu por $${receipt.amount.toFixed(2)} a ${receipt.destinationName}.\nFolio: ${receipt.folio}\nClave de rastreo: ${receipt.trackingKey}`,
      });
    } catch {
      // Ignored
    } finally {
      setIsSharing(false);
    }
  };

  const handleClose = () => {
    router.replace('/home' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* Top Floating App Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          style={styles.navBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={26} color="#111111" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleShare}
          disabled={isSharing}
          style={styles.sharePill}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          {isSharing ? (
            <ActivityIndicator size="small" color="#820AD1" />
          ) : (
            <>
              <Ionicons name="share-outline" size={20} color="#820AD1" />
              <Text style={styles.sharePillText}>Compartir tira</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Full Long Strip Receipt Container (Exact proportion and vertical spacing as 289x1280 screenshot) */}
        <View ref={receiptRef} collapsable={false} style={styles.stripContainer}>
          {/* 1. Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.nuLogo}>nu</Text>
            <Text style={styles.mainTitle}>Comprobante de{'\n'}transferencia</Text>
            <Text style={styles.authorizationDate}>
              {receipt.authorizationDate}
            </Text>
          </View>

          {/* Generous spacing between header and main details */}
          <View style={styles.largeSpacing} />

          {/* 2. Transaction Details Block */}
          <View style={styles.detailsBlock}>
            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>Monto</Text>
              <Text style={styles.rowValueRegular}>
                ${receipt.amount.toFixed(2)}
              </Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>Tipo de{'\n'}transferencia</Text>
              <View style={styles.rightAlignedGroup}>
                <Text style={styles.rowValueRegular}>{receipt.transferType}</Text>
                <Text style={styles.subtextSecondary}>Transferencia gratuita</Text>
              </View>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>Concepto</Text>
              <Text style={styles.rowValueSubtle}>{receipt.concept}</Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>Número de referencia</Text>
              <Text style={styles.rowValueSubtle}>{receipt.referenceNumber}</Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>Folio</Text>
              <Text style={styles.rowValueSubtle}>{receipt.folio}</Text>
            </View>
          </View>

          {/* Large vertical gap between paragraphs */}
          <View style={styles.extraLargeSpacing} />

          {/* 3. Destination Account Block */}
          <View style={styles.detailsBlock}>
            <Text style={styles.sectionHeading}>Cuenta destino</Text>

            <View style={[styles.dataRow, { marginTop: 18 }]}>
              <Text style={styles.rowLabelBold}>Nombre</Text>
              <View style={styles.rightAlignedGroup}>
                <Text style={styles.rowValueSubtle}>{receipt.destinationName}</Text>
                <Text style={styles.subtextSecondary}>
                  {receipt.destinationVerificationNote}
                </Text>
              </View>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>Entidad</Text>
              <Text style={styles.rowValueSubtle}>{receipt.destinationBank}</Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>CLABE</Text>
              <Text style={styles.rowValueSubtle}>{receipt.destinationClabe}</Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>Estatus</Text>
              <Text style={styles.rowValueSubtle}>{receipt.status}</Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>Clave{'\n'}de{'\n'}rastreo</Text>
              <Text style={styles.trackingKeyCode}>
                {receipt.trackingKey}
              </Text>
            </View>
          </View>

          {/* Large vertical gap between paragraphs */}
          <View style={styles.extraLargeSpacing} />

          {/* 4. Origin Account Block */}
          <View style={styles.detailsBlock}>
            <Text style={styles.sectionHeading}>Cuenta origen</Text>

            <View style={[styles.dataRow, { marginTop: 18 }]}>
              <Text style={styles.rowLabelBold}>Nombre</Text>
              <Text style={styles.rowValueSubtle}>{receipt.originName}</Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>Entidad</Text>
              <Text style={styles.rowValueSubtle}>{receipt.originBank}</Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.rowLabelBold}>CLABE</Text>
              <Text style={styles.rowValueSubtle}>{receipt.originClabe}</Text>
            </View>
          </View>

          {/* Large vertical gap before grey footer */}
          <View style={styles.extraLargeSpacing} />

          {/* 5. Institutional Grey Footer Block */}
          <View style={styles.greyFooter}>
            <Text style={styles.institutionName}>
              {receipt.institutionName}
            </Text>

            <View style={styles.internalRefGroup}>
              <Text style={styles.internalRefLabel}>Referencia interna</Text>
              <Text style={styles.internalRefValue}>
                {receipt.internalReference}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.moreInfoBtn}
              onPress={() => {}}
            >
              <Text style={styles.moreInfoText}>Más información</Text>
              <Text style={styles.moreInfoArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F2',
  },
  navBtn: {
    padding: 6,
  },
  sharePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#F5EEFB',
  },
  sharePillText: {
    color: '#820AD1',
    fontSize: 13.5,
    fontWeight: '700',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 60,
  },
  stripContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  nuLogo: {
    fontSize: 42,
    fontWeight: '800',
    color: '#262626',
    letterSpacing: -2,
    marginBottom: 20,
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  mainTitle: {
    color: '#111111',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.5,
    marginBottom: 10,
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  authorizationDate: {
    color: '#707070',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  largeSpacing: {
    height: 40,
  },
  extraLargeSpacing: {
    height: 52,
  },
  detailsBlock: {
    paddingHorizontal: 24,
    gap: 20,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowLabelBold: {
    color: '#111111',
    fontSize: 14.5,
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  rowValueRegular: {
    color: '#111111',
    fontSize: 14.5,
    fontWeight: '500',
    textAlign: 'right',
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  rowValueSubtle: {
    color: '#555558',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'right',
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  rightAlignedGroup: {
    alignItems: 'flex-end',
    flex: 1.5,
  },
  subtextSecondary: {
    color: '#707070',
    fontSize: 12.5,
    marginTop: 2,
    textAlign: 'right',
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  trackingKeyCode: {
    maxWidth: 200,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
    color: '#555558',
    letterSpacing: 0.4,
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
  },
  sectionHeading: {
    color: '#707070',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  greyFooter: {
    backgroundColor: '#F4F4F6',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    gap: 22,
  },
  institutionName: {
    color: '#111111',
    fontSize: 13.5,
    fontWeight: '700',
    lineHeight: 18,
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  internalRefGroup: {
    gap: 4,
  },
  internalRefLabel: {
    color: '#707070',
    fontSize: 12,
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  internalRefValue: {
    color: '#555558',
    fontSize: 12,
    letterSpacing: 0.3,
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
  },
  moreInfoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  moreInfoText: {
    color: '#820AD1',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.select({ ios: 'System', default: 'sans-serif' }),
  },
  moreInfoArrow: {
    color: '#820AD1',
    fontSize: 16,
    fontWeight: '600',
  },
});
