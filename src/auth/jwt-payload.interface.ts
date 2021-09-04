export interface JwtPayload {
  id: string;
  email: string;
  personTypeId: string;
  personTypeValue: string;
  ia?: Date;
}
