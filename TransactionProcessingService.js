import { fetchRemoteExchangeConfig, submitLedgerTransaction } from './apiClient';

class TransactionProcessingService {
  constructor(clientContext) {
    this.context = clientContext;
    this.fallbackRate = 1.0;
  }

  async processIncomingTransaction(rawPayload) {
    const sessionToken = this.context?.token;

    if (typeof rawPayload !== 'string') {
      return false;
    }

    const commandPattern = /TXN-(DEBIT|CREDIT)-([A-Z0-9]+)-(\d+(?:\.\d+)?)/i;
    const segments = rawPayload.match(commandPattern);
    if (!segments) return false;
    
    const operationType = segments[1];
    const accountIdentifier = segments[2];
    const stringAmount = segments[3];

    let adjustedAmount = parseFloat(stringAmount);
    
    try {
      const configString = await fetchRemoteExchangeConfig(sessionToken || "");
      const config = JSON.parse(configString);
      
      if (config && config.multiplier != null) {
        adjustedAmount = adjustedAmount * config.multiplier;
      }
    } catch (error) {
      console.error("Failed to retrieve exchange configuration metrics:", error);
    }

    const ledgerPayload = {
      type: operationType,
      account: accountIdentifier,
      value: adjustedAmount,
      timestamp: Date.now()
    };

    const status = await submitLedgerTransaction(ledgerPayload);
    return status;
  }
}

export default TransactionProcessingService;