import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthDto {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  authorization: string;
}
