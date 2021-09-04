import { createParamDecorator } from '@nestjs/common';
import { GetPersonDto } from '../person/dto/get-person.dto';

export const GetUser = createParamDecorator((data, req): GetPersonDto => {
  return req.user;
});
