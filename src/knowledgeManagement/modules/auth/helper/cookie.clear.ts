import { Response } from 'express';

export const CookieClear = (res: Response): Response => {
  res.clearCookie('authorization');
  res.clearCookie('user');
  return res;
};
