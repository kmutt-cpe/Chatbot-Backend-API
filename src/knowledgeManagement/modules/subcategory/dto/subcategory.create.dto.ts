import { Field, InputType } from '@nestjs/graphql';
import { Subcategory as SubcategoryInterface } from 'knowledgeManagement/modules/subcategory/subcategory.interface';

@InputType()
export class CreateSubcategoryDto implements SubcategoryInterface {
  id: undefined;
  category: undefined;

  @Field(() => String)
  subcategory: string;

  @Field(() => String)
  categoryId: string;
}
