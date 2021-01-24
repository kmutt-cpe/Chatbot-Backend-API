import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { FAQ as FAQInterface } from 'knowledgeManagement/modules/faq/faq.interface';

@ObjectType()
export class UpdateFAQDto implements FAQInterface {
  lastEditor: undefined;
  subcategory: undefined;

  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => String)
  @IsString()
  subcategoryId: string;

  @Field(() => String)
  @IsString()
  lastEditorId: string;

  @Field(() => String)
  @IsString()
  question: string;

  @Field(() => String)
  @IsString()
  answer: string;
}
