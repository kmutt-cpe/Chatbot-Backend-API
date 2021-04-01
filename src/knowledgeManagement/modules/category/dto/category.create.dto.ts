import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Category as CategoryInterface } from 'knowledgeManagement/modules/category/category.interface';

@InputType()
export class CreateCategoryDto implements CategoryInterface {
  id: undefined;

  @Field(() => String)
  @IsString()
  category: string;

  subcategories: undefined;
}
