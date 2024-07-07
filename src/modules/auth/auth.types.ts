type Role = 'owner' | 'customer';

export type JWTPayload = {
  sub: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  iat?: number;
  exp?: number;
};
