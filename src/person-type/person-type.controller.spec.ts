import { Test, TestingModule } from '@nestjs/testing';
import { PersonTypeController } from './person-type.controller';
import { PersonTypeService } from './person-type.service';

describe('PersonTypeController', () => {
  let controller: PersonTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonTypeController],
      providers: [PersonTypeService],
    }).compile();

    controller = module.get<PersonTypeController>(PersonTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
