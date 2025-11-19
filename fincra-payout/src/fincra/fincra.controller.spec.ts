import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { FincraController } from './fincra.controller';
import { FincraService } from './fincra.service';

describe('FincraController', () => {
  let controller: FincraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [FincraController],
      providers: [FincraService],
    }).compile();

    controller = module.get<FincraController>(FincraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /fincra/business', () => {
    it('should return business details', async () => {
      const result = await controller.getBusinessId();
      
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });
  });
});