import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as UserInterface } from 'knowledgeManagement/interfaces/user.interface';

@ObjectType()
export class UserDto implements UserInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  password: undefined;

  @Field(() => String)
  name: string;

  @Field(() => String)
  role: string;
}
