import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { FincraService } from './fincra.service';
import { PaymentDestination } from './dto/create-payout.dto';

describe('FincraService', () => {
  let service: FincraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [FincraService],
    }).compile();

    service = module.get<FincraService>(FincraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBusinessId', () => {
    it('should return business details', async () => {
      const result = await service.getBusinessId();
      
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.data.id).toBeTruthy();
    });
  });

  describe('getWalletBalance', () => {
    it('should return wallet balances', async () => {
      const businessId = 'test-business-id';
      const result = await service.getWalletBalance(businessId);
      
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('createPayout', () => {
    it('should create a payout', async () => {
      const dto = {
        business: 'test-business-id',
        sourceCurrency: 'NGN',
        destinationCurrency: 'NGN',
        amount: 10000,
        description: 'Test payout',
        customerReference: 'TEST-001',
        beneficiary: {
          firstName: 'dake',
          lastName: 'Asiadiachi',
          email: 'davidasiadiachi@gmail.com',
          type: 'individual',
          accountHolderName: 'Dake Asiadiachi',
          accountNumber: '1234567890',
          country: 'NG',
          bankCode: '044',
        },
        paymentDestination: PaymentDestination.BANK_ACCOUNT,
      };

      const result = await service.createPayout(dto);
      
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });
  });

  describe('fetchPayoutByReference', () => {
    it('should fetch payout by Fincra reference', async () => {
      const result = await service.fetchPayoutByReference('FINCRA-REF-123');
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });
  });

  describe('fetchPayoutByCustomerReference', () => {
    it('should fetch payout by customer reference', async () => {
      const result = await service.fetchPayoutByCustomerReference('CUST-REF-123');
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });
  });

  describe('listPayouts', () => {
    it('should list payouts', async () => {
      const result = await service.listPayouts({ page: 1, perPage: 10 });
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });
  });

  describe('walletToWalletTransfer', () => {
    it('should transfer between wallets', async () => {
      const dto = {
        business: 'test-business-id',
        customerReference: 'W2W-001',
        amount: 5000,
        currency: 'NGN',
        description: 'Internal transfer',
        recipientEmail: 'davidasiadiachi@gmail.com',
      };
      const result = await service.walletToWalletTransfer(dto);
      expect(result).toBeDefined();
    });
  });

  describe('createBeneficiary', () => {
    it('should create a beneficiary', async () => {
      const dto = {
        business: 'test-business-id',
        firstName: 'tinubu',
        lastName: 'dake',
        email: 'dake@asiadiachi.com',
        type: 'individual',
        accountHolderName: 'tinubu dake',
        accountNumber: '9876543210',
        country: 'NG',
        currency: 'NGN',
        paymentDestination: 'bank_account',
        bankCode: '044',
      };
      const result = await service.createBeneficiary(dto);
      expect(result).toBeDefined();
    });
  });

  describe('listBeneficiaries', () => {
    it('should list beneficiaries', async () => {
      const result = await service.listBeneficiaries('test-business-id', { page: 1, perPage: 10 });
      expect(result).toBeDefined();
    });
  });

  describe('fetchBeneficiary', () => {
    it('should fetch a beneficiary', async () => {
      const result = await service.fetchBeneficiary('beneficiary-id');
      expect(result).toBeDefined();
    });
  });

  describe('updateBeneficiary', () => {
    it('should update a beneficiary', async () => {
      const result = await service.updateBeneficiary('beneficiary-id', { email: 'eg.dake@gmail.com' });
      expect(result).toBeDefined();
    });
  });

  describe('deleteBeneficiary', () => {
    it('should delete a beneficiary', async () => {
      const result = await service.deleteBeneficiary('beneficiary-id');
      expect(result).toBeDefined();
    });
  });

  describe('listBanks', () => {
    it('should list banks', async () => {
      const result = await service.listBanks({ country: 'NG', currency: 'NGN' });
      expect(result).toBeDefined();
    });
  });

  describe('getSupportedCurrencies', () => {
    it('should get currencies', async () => {
      const result = await service.getSupportedCurrencies();
      expect(result).toBeDefined();
    });
  });

  describe('getExchangeRate', () => {
    it('should get exchange rate', async () => {
      const result = await service.getExchangeRate('USD', 'NGN');
      expect(result).toBeDefined();
    });
  });

  describe('createQuote', () => {
    it('should create a quote', async () => {
      const dto = {
        business: 'test-business-id',
        sourceCurrency: 'USD',
        destinationCurrency: 'NGN',
        amount: 1000,
      };
      const result = await service.createQuote(dto);
      expect(result).toBeDefined();
    });
  });

  describe('getSupportedCountries', () => {
    it('should get supported countries', async () => {
      const result = await service.getSupportedCountries();
      expect(result).toBeDefined();
    });
  });
});