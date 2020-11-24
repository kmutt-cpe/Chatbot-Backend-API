import { Field, ObjectType } from '@nestjs/graphql';
import { Subcategory as SubcategoryInterface } from 'knowledgeManagement/interfaces/subcategory.interface';
import { CategoryDto } from './category.dto';

@ObjectType()
export class SubcategoryDto implements SubcategoryInterface {
  @Field()
  id: string;

  @Field()
  subcategory: string;

  @Field(() => CategoryDto)
  category: CategoryDto;
}
