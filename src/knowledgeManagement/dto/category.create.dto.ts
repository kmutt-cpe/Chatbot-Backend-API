import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Category as CategoryInterface } from 'knowledgeManagement/interfaces/category.interface';

@ObjectType()
export class CreateCategoryDto implements CategoryInterface {
  id: undefined;

  @Field()
  @IsString()
  category: string;

  @Field(() => [String])
  subcategories: string[] = [];
}
