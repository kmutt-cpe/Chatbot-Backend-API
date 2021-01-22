import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Subcategory as SubcategoryInterface } from 'knowledgeManagement/interfaces/subcategory.interface';
import { CategoryDto } from './category.dto';

@ObjectType()
export class SubcategoryDto implements SubcategoryInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  subcategory: string;

  @Field(() => CategoryDto)
  category: CategoryDto | undefined;
}
