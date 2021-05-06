import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User as UserInterface } from 'knowledgeManagement/modules/user/user.interface';

@InputType()
export class UpdatePasswordDto implements UserInterface {
  username: undefined;
  name: undefined;
  role: undefined;

  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsString()
  editorPassword: string;

  @Field(() => String, { nullable: true })
  editorId: string | null;
}
