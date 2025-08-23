import jose from 'jose';

export interface Payload extends jose.JWTPayload {
  email: string;
  sub: string;
  firstName: string;
  lastName: string;
}
