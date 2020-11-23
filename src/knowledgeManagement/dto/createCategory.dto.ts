import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Category as CategoryInterface } from 'knowledgeManagement/interfaces/category.interface';
import { SubcategoryDto } from './subcategory.dto';

@ObjectType()
export class CreateCategoryDto implements CategoryInterface {
  id: undefined;

  @Field()
  @IsString()
  category: string;

  @Field()
  subcategories: string[];
}
