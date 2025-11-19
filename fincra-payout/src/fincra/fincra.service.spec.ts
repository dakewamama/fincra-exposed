import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { FincraService } from './fincra.service';

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
});