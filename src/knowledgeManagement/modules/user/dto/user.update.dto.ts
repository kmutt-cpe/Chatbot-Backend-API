import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User as UserInterface } from 'knowledgeManagement/modules/user/user.interface';

@ObjectType()
export class UpdateUserDto implements UserInterface {
  username: undefined;

  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  role: string;
}
