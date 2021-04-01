import { Field, InputType } from '@nestjs/graphql';
import { User as UserInterface } from 'knowledgeManagement/modules/user/user.interface';

@InputType()
export class CreateUserDto implements UserInterface {
  id: undefined;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  role: string;
}
