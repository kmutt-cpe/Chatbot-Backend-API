import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { FAQ as FAQInterface } from 'knowledgeManagement/modules/faq/faq.interface';

@InputType()
export class CreateFAQDto implements FAQInterface {
  // Implement interface
  id: undefined;
  subcategory: undefined;
  lastEditor: undefined;

  @Field(() => String)
  @IsString()
  question: string;

  @Field(() => String)
  @IsString()
  answer: string;

  @Field(() => String)
  @IsString()
  subcategoryId: string;

  @Field(() => String)
  @IsString()
  lastEditorId: string;
}
