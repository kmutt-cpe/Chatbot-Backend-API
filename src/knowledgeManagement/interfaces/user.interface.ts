import { BaseInterface } from '@BaseObject';

export interface User extends BaseInterface {
  username: string;
  password: string;
  name: string;
  role: string;
}
