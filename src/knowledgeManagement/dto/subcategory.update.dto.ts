import { Field, ObjectType } from '@nestjs/graphql';
import { Subcategory as SubcategoryInterface } from 'knowledgeManagement/interfaces/subcategory.interface';

@ObjectType()
export class UpdateSubcategoryDto implements SubcategoryInterface {
  id: undefined;
  category: undefined;

  @Field(() => String)
  subcategory: string;

  @Field(() => String)
  categoryId: string;
}
