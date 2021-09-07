import { SetMetadata } from '@nestjs/common';

export const PersonTypes = (...personTypes: string[]) =>
  SetMetadata('personTypes', personTypes);
