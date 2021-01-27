import { Test, TestingModule } from '@nestjs/testing';
import { Jwn.StrategyService } from './jwn.strategy.service';

describe('Jwn.StrategyService', () => {
  let service: Jwn.StrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Jwn.StrategyService],
    }).compile();

    service = module.get<Jwn.StrategyService>(Jwn.StrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
