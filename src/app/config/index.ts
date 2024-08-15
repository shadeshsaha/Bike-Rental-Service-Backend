import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  PORT: process.env.PORT,
  DATABASE_URL: `${process.env.DATABASE_URL}`,
  salt: process.env.SALT,
  node_ENV: `${process.env.NODE_ENV}`,
  jwt_secret: `${process.env.JWT_SECRET}`,
  expires_in: process.env.EXPIRES_IN,
};
