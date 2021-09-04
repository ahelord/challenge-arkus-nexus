import { Test, TestingModule } from '@nestjs/testing';
import { PersonTypeService } from './person-type.service';

describe('PersonTypeService', () => {
  let service: PersonTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonTypeService],
    }).compile();

    service = module.get<PersonTypeService>(PersonTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
