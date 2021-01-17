import { User as UserInterface } from '../interfaces/user.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column, OneToMany } from 'typeorm';
import { FAQ } from './faq.entity';

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

  @OneToMany(() => FAQ, (faq) => faq.lastEditor)
  faqs: FAQ[];

  getData() {
    // todo: Implement return data
    return null;
  }
}
