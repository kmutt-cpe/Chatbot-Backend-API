import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Category as CategoryInterface } from 'knowledgeManagement/modules/category/category.interface';

@ObjectType()
export class UpdateCategoryDto implements CategoryInterface {
  id: undefined;

  @Field()
  @IsString()
  category: string;

  subcategories: undefined;
}
