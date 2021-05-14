import { User as UserInterface } from '../user.interface';
import { BaseEntity } from '@BaseObject';
import { Entity, Column, OneToMany } from 'typeorm';
import { FAQ } from '../../faq/domain/faq.entity';
import { UserDto } from 'knowledgeManagement/modules/user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from './userRole.constant';

@Entity()
export class User extends BaseEntity implements UserInterface {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: 'admin',
  })
  role: string;

  @OneToMany(() => FAQ, (faq) => faq.lastEditor)
  faqs: Promise<FAQ[]>;

  getData(): UserDto {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      password: undefined,
      role: this.role,
    };
  }

  async comparePassword(passwordInput: string): Promise<boolean> {
    return await bcrypt.compare(passwordInput, this.password);
  }
}
