import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Category as CategoryInterface } from 'knowledgeManagement/modules/category/category.interface';

@InputType()
export class UpdateCategoryDto implements CategoryInterface {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => String)
  @IsString()
  category: string;

  subcategories: undefined;
}
