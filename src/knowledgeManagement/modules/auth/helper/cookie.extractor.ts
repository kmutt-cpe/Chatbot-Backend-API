import { Request } from 'express';

export const CookieExtracter = (req: Request): string => {
  const token = req?.cookies?.authorization || '';
  return token;
};
