import { JwtPayload } from 'jsonwebtoken';
// import { TJwtPayload } from '../modules/auth/auth.constants';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
