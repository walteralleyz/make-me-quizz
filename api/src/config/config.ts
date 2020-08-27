import * as dotenv from 'dotenv';
dotenv.config();

export const hash = process.env.PHONE_HASH || 'hash';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';