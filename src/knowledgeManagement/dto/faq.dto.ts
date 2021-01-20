import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FAQ as FAQInterface } from 'knowledgeManagement/interfaces/faq.interface';
import { CategoryDto } from './category.dto';
import { SubcategoryDto } from './subcategory.dto';
import { UserDto } from './user.dto';

@ObjectType()
export class FAQDto implements FAQInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  question: string;

  @Field(() => String)
  answer: string;

  @Field(() => SubcategoryDto)
  subcategory: SubcategoryDto;

  @Field(() => CategoryDto)
  category: CategoryDto;

  @Field(() => UserDto)
  lastEditor: UserDto;
}
