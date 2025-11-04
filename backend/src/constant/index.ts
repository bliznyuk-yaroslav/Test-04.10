import dotenv from 'dotenv';
dotenv.config();

export const PORT = Number(process.env.PORT || 3000);
export const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
export const DATABASE_URL = process.env.DATABASE_URL; // Prisma will use this
