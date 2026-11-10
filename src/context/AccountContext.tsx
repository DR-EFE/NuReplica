import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockContacts, Contact, RecentTransaction } from '../mock/data';

export interface TransferReceiptData {
  id: string;
  authorizationDate: string;
  amount: number;
  transferType: string;
  concept: string;
  referenceNumber: string;
  folio: string;
  destinationName: string;
  destinationVerificationNote: string;
  destinationBank: string;
  destinationClabe: string;
  status: string;
  trackingKey: string;
  originName: string;
  originBank: string;
  originClabe: string;
  institutionName: string;
  internalReference: string;
}

export interface CajitaItem {
  id: string;
  name: string;
  type: 'turbo' | 'standard';
  balance: number;
  yieldAmount: number;
  rate: string;
  frozenBalance?: number;
  frozenRate?: string;
}

interface AccountContextType {
  balance: number;
  creditPositiveBalance: number;
  creditAvailableLimit: number;
  autoPayActive: boolean;
  contacts: Contact[];
  transactions: RecentTransaction[];
  lastReceipt: TransferReceiptData | null;
  cajitas: CajitaItem[];
  cajitasTotal: number;
  cajitasYield: number;
  cajitaTurboBalance: number;
  cajitaTurboYield: number;
  primeraCajitaBalance: number;
  primeraCajitaYield: number;
  createCajita: (name: string) => void;
  executeTransfer: (data: {
    amount: number;
    recipientName: string;
    bankName: string;
    fullAccountClabe: string;
    concept?: string;
    referenceNumber?: string;
    sourceType?: string;
  }) => TransferReceiptData;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Initial balance requested: 1 Million pesos ($1,000,000.00)
const INITIAL_BALANCE = 1000000.00;

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [creditPositiveBalance] = useState<number>(4.39);
  const [creditAvailableLimit] = useState<number>(13604.39);
  const [autoPayActive] = useState<boolean>(true);
  const [contacts] = useState<Contact[]>(mockContacts);
  const [transactions, setTransactions] = useState<RecentTransaction[]>([]);
  const [lastReceipt, setLastReceipt] = useState<TransferReceiptData | null>(null);

  // Initial cajitas list with amounts > 100,000 as requested
  const [cajitas, setCajitas] = useState<CajitaItem[]>([
    {
      id: 'cajita_turbo',
      name: 'Cajita Turbo 🚀',
      type: 'turbo',
      balance: 165000.00,
      yieldAmount: 18420.35,
      rate: '13.00%',
    },
    {
      id: 'primera_cajita',
      name: 'Mi primera Cajita',
      type: 'standard',
      balance: 120420.76,
      yieldAmount: 6430.15,
      rate: '6.50%',
      frozenBalance: 0.00,
      frozenRate: 'hasta 6.80%',
    },
  ]);

  const cajitasTotal = cajitas.reduce((acc, c) => acc + c.balance, 0);
  const cajitasYield = cajitas.reduce((acc, c) => acc + c.yieldAmount, 0);
  const cajitaTurboBalance = cajitas.find((c) => c.type === 'turbo')?.balance || 165000.00;
  const cajitaTurboYield = cajitas.find((c) => c.type === 'turbo')?.yieldAmount || 18420.35;
  const primeraCajitaBalance = cajitas.find((c) => c.id === 'primera_cajita')?.balance || 120420.76;
  const primeraCajitaYield = cajitas.find((c) => c.id === 'primera_cajita')?.yieldAmount || 6430.15;

  const createCajita = (name: string) => {
    const newCajita: CajitaItem = {
      id: `cajita_${Date.now()}`,
      name: name || 'Nueva Cajita',
      type: 'standard',
      balance: 0.00,
      yieldAmount: 0.00,
      rate: '13.00%',
      frozenBalance: 0.00,
      frozenRate: 'hasta 6.80%',
    };
    setCajitas((prev) => [...prev, newCajita]);
  };

  const generateRandomCode = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const formatCurrentCDMXDate = () => {
    const now = new Date();
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const day = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    return `Autorización ${day} ${month} ${year}, ${formattedHours}:${minutes}:${seconds} ${ampm} (hora de CDMX)`;
  };

  const executeTransfer = ({
    amount,
    recipientName,
    bankName,
    fullAccountClabe,
    concept = 'Transferencia',
    referenceNumber = '81126',
    sourceType = 'Cuenta de débito',
  }: {
    amount: number;
    recipientName: string;
    bankName: string;
    fullAccountClabe: string;
    concept?: string;
    referenceNumber?: string;
    sourceType?: string;
  }): TransferReceiptData => {
    // 1. Deduct amount from balance
    setBalance((prev) => Math.max(0, parseFloat((prev - amount).toFixed(2))));

    // 2. Build receipt matching screenshot 10
    const maskedClabe = fullAccountClabe.length >= 4 
      ? `••••${fullAccountClabe.slice(-4)}`
      : '••••7922';

    const newReceipt: TransferReceiptData = {
      id: generateUUID(),
      authorizationDate: formatCurrentCDMXDate(),
      amount: amount,
      transferType: 'SPEI',
      concept: concept || 'Transferencia',
      referenceNumber: referenceNumber || '81126',
      folio: generateRandomCode(9),
      destinationName: recipientName,
      destinationVerificationNote: 'Dato no verificado por Nu',
      destinationBank: bankName,
      destinationClabe: maskedClabe,
      status: 'Aceptada',
      trackingKey: `NU3AU5BG267K8MCPRE920${generateRandomCode(7)}`,
      originName: 'Felipe Ramos Velázquez',
      originBank: 'Nubank',
      originClabe: '••••2360',
      institutionName: 'Nubank S.A., Institución de Banca Múltiple',
      internalReference: generateUUID(),
    };

    setLastReceipt(newReceipt);

    // 3. Add to recent transactions
    const newTx: RecentTransaction = {
      id: newReceipt.id,
      title: 'Transferencia enviada',
      subtitle: `${recipientName} • ${bankName}`,
      amount: -amount,
      date: 'Hoy',
      type: 'outgoing',
    };
    setTransactions((prev) => [newTx, ...prev]);

    return newReceipt;
  };

  return (
    <AccountContext.Provider
      value={{
        balance,
        creditPositiveBalance,
        creditAvailableLimit,
        autoPayActive,
        contacts,
        transactions,
        lastReceipt,
        cajitas,
        cajitasTotal,
        cajitasYield,
        cajitaTurboBalance,
        cajitaTurboYield,
        primeraCajitaBalance,
        primeraCajitaYield,
        createCajita,
        executeTransfer,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
