import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Part} from './part.model';
import {Detail} from './detail.model';

@model()
export class PartsDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  value?: string;

  @belongsTo(() => Part)
  partId: string;

  @belongsTo(() => Detail)
  detailId: string;

  constructor(data?: Partial<PartsDetail>) {
    super(data);
  }
}

export interface PartsDetailRelations {
  // describe navigational properties here
}

export type PartsDetailWithRelations = PartsDetail & PartsDetailRelations;
