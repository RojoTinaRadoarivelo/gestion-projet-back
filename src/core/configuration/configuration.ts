import { ConfigDTO } from '../utils/interfaces/config';

export const CONFIG = (): ConfigDTO => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  allowedUrls: process.env.ALLOWED_ORIGIN_URL.split(','),
  ttl: parseInt(process.env.TTL, 10) || 6000,
  limit: parseInt(process.env.LIMIT, 10) || 8,
});
