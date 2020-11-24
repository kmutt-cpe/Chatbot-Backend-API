import { Field, ObjectType } from '@nestjs/graphql';
import { Category as CategoryInterface } from 'knowledgeManagement/interfaces/category.interface';
import { SubcategoryDto } from './subcategory.dto';

@ObjectType()
export class CategoryDto implements CategoryInterface {
  @Field()
  id: string;

  @Field()
  category: string;

  @Field(() => [SubcategoryDto], { nullable: true })
  subcategories: SubcategoryDto[];
}
