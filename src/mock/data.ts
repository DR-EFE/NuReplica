export interface UserProfile {
  id: string;
  firstName: string;
  fullName: string;
  greetingName: string;
  debitBalance: number;
  creditPositiveBalance: number;
  creditAvailableLimit: number;
  autoPayActive: boolean;
}

export interface Contact {
  id: string;
  initials: string;
  displayName: string;
  bankSubtitle: string;
  fullName: string;
  bankName: string;
  accountType: 'CLABE' | 'Débito' | 'Tarjeta';
  accountMasked: string;
  fullAccountClabe: string;
}

export interface TransferSource {
  id: 'debit' | 'credit';
  title: string;
  amountFormatted: string;
  rawAmount: number;
  badge?: string;
  subtitle: string;
}

export interface RecentTransaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  type: 'incoming' | 'outgoing';
}

export const mockUser: UserProfile = {
  id: 'user_1',
  firstName: 'Felipe',
  fullName: 'Ramos Velázquez Felipe',
  greetingName: 'F...',
  debitBalance: 0.01,
  creditPositiveBalance: 4.39,
  creditAvailableLimit: 13604.39,
  autoPayActive: true,
};

export const mockContacts: Contact[] = [
  {
    id: 'contact_1',
    initials: 'BY',
    displayName: 'BBVA YO',
    bankSubtitle: 'BBVA MEXICO – CLABE ••••7922',
    fullName: 'Ramos Velázquez Felipe',
    bankName: 'BBVA MEXICO',
    accountType: 'CLABE',
    accountMasked: '••••7922',
    fullAccountClabe: '0121 8001 5025 927922',
  },
  {
    id: 'contact_2',
    initials: 'HY',
    displayName: 'HeyBanco Yo',
    bankSubtitle: 'BANREGIO – CLABE ••••7076',
    fullName: 'Ramos Velázquez Felipe',
    bankName: 'BANREGIO',
    accountType: 'CLABE',
    accountMasked: '••••7076',
    fullAccountClabe: '0581 8000 0012 347076',
  },
  {
    id: 'contact_3',
    initials: 'MR',
    displayName: 'Miriam Ramos',
    bankSubtitle: 'AZTECA – Débito ••••3384',
    fullName: 'Miriam Ramos',
    bankName: 'AZTECA',
    accountType: 'Débito',
    accountMasked: '••••3384',
    fullAccountClabe: '1271 8000 0055 443384',
  },
  {
    id: 'contact_4',
    initials: 'NM',
    displayName: 'nueva mercado',
    bankSubtitle: 'Mercado Pago W – CLABE ••••3778',
    fullName: 'Mercado Pago Wallet',
    bankName: 'Mercado Pago W',
    accountType: 'CLABE',
    accountMasked: '••••3778',
    fullAccountClabe: '7221 8000 0098 763778',
  },
];

export const mockTransferSources: TransferSource[] = [
  {
    id: 'debit',
    title: 'Cuenta de débito',
    amountFormatted: '$0.01',
    rawAmount: 0.01,
    subtitle: 'Envío inmediato',
  },
  {
    id: 'credit',
    title: 'Tarjeta de crédito',
    amountFormatted: '$13,600.00',
    rawAmount: 13600.0,
    badge: 'A 12 meses',
    subtitle: 'Envío inmediato',
  },
];

export const mockTransactions: RecentTransaction[] = [
  {
    id: 'tx_1',
    title: 'Transferencia enviada',
    subtitle: 'BBVA YO • BBVA MEXICO',
    amount: -0.01,
    date: 'Hoy, 23:20',
    type: 'outgoing',
  },
  {
    id: 'tx_2',
    title: 'Depósito recibido',
    subtitle: 'SPEI recibido de HeyBanco',
    amount: 500.0,
    date: 'Ayer',
    type: 'incoming',
  },
  {
    id: 'tx_3',
    title: 'OXXO Gasolinera',
    subtitle: 'Tarjeta física •••• 4012',
    amount: -250.0,
    date: '5 Nov',
    type: 'outgoing',
  },
  {
    id: 'tx_4',
    title: 'Spotify Premium',
    subtitle: 'Tarjeta virtual •••• 8891',
    amount: -129.0,
    date: '1 Nov',
    type: 'outgoing',
  },
];
