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
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          type: 'individual',
          accountHolderName: 'John Doe',
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
});