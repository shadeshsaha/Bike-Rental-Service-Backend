export interface TJwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
