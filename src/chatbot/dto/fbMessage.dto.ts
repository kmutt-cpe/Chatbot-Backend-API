import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FBMessage as FBMessageInterface } from 'chatbot/interfaces/fbMessage.interface';

@ObjectType()
export class FBMessageDto implements FBMessageInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  message: string;
}
