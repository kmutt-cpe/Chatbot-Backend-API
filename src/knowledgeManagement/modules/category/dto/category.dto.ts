import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Category as CategoryInterface } from 'knowledgeManagement/modules/category/category.interface';
import { SubcategoryDto } from '../../subcategory/dto/subcategory.dto';

@ObjectType()
export class CategoryDto implements CategoryInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  category: string;

  @Field(() => [SubcategoryDto], { nullable: true })
  subcategories: SubcategoryDto[] | undefined;
}
