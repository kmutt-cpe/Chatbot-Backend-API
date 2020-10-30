import { User as UserInterface } from '../interfaces/user.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity implements UserInterface {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  role: string;
}
