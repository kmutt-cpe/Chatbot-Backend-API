import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { FAQ as FAQInterface } from 'knowledgeManagement/modules/faq/faq.interface';
import { CategoryDto } from '../../category/dto/category.dto';
import { SubcategoryDto } from '../../subcategory/dto/subcategory.dto';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
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
