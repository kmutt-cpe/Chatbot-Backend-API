import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Subcategory as SubcategoryInterface } from 'knowledgeManagement/modules/subcategory/subcategory.interface';

@ObjectType()
export class UpdateSubcategoryDto implements SubcategoryInterface {
  category: undefined;

  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => String)
  @IsString()
  subcategory: string;

  @Field(() => String)
  @IsString()
  categoryId: string;
}
