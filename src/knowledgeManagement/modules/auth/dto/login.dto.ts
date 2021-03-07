import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginDto {
  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsString()
  password: string;
}
