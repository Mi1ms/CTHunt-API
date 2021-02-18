import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const DATABASE_URL = process.env.DATABASE_URL;
export const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_ASSETS_BUCKET,
    AWS_REGION,
} = process.env;
export const PORT = parseInt(process.env.PORT || '4242', 10);
export const HOST = process.env.HOST || '0.0.0.0';
export default {
    NODE_ENV,
    SENDGRID_API_KEY,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_ASSETS_BUCKET,
    AWS_REGION,
    PORT,
    HOST,
    DATABASE_URL,
};
