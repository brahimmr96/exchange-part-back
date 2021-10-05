import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {PartCategory} from './part-category.model';
import {PartMark} from './part-mark.model';
import {PartsDetail} from './parts-detail.model';
import {PartsModels} from './parts-models.model';

@model()
export class Part extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  reference: string;

  @property({
    type: 'string',
    required: true,
  })
  label: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
  })
  confirmedPart?: boolean;

  @belongsTo(() => PartCategory)
  partCategoryId: string;

  @belongsTo(() => PartMark)
  partMarkId: string;

  @hasMany(() => PartsDetail)
  partsDetails: PartsDetail[];

  @hasMany(() => PartsModels)
  partsModels: PartsModels[];

  constructor(data?: Partial<Part>) {
    super(data);
  }
}

export interface PartRelations {
  // describe navigational properties here
}

export type PartWithRelations = Part & PartRelations;
