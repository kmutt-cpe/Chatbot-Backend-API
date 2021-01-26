import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as UserInterface } from 'knowledgeManagement/modules/user/user.interface';

@ObjectType()
export class UpdateUserDto implements UserInterface {
  id: undefined;

  username: undefined;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  role: string;
}
