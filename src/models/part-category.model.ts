import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';

@model()
export class PartCategory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'Number',
    generated: true,
  })
  idNumber?: Number;
  @property({
    type: 'string',
    required: true,
  })
  label: string;
  @property({
    type: 'Number',
    generated: true,
  })
  pop?: Number;
  @property({
    type: 'string',
  })
  description?: string;

  @belongsTo(() => PartCategory, {name: 'parentPartCategory'})
  partCategoryId: string;

  @hasMany(() => PartCategory, {name: 'partCategories'})
  partCategories: PartCategory[];

  /* @property({
    type: 'string',
  })
  partCategoryId?: string; */

  constructor(data?: Partial<PartCategory>) {
    super(data);
  }
}

export interface PartCategoryRelations {
  // describe navigational properties here
  parentPartCategory?: PartCategoryWithRelations;
  partCategories?: PartCategoryWithRelations;
}

export type PartCategoryWithRelations = PartCategory & PartCategoryRelations;
