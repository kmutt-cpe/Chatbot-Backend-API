import { Field, ObjectType } from '@nestjs/graphql';
import { Subcategory as SubcategoryInterface } from 'knowledgeManagement/modules/subcategory/subcategory.interface';

@ObjectType()
export class CreateSubcategoryDto implements SubcategoryInterface {
  id: undefined;
  category: undefined;

  @Field(() => String)
  subcategory: string;

  @Field(() => String)
  categoryId: string;
}
