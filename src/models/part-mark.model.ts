import {Entity, model, property} from '@loopback/repository';

@model()
export class PartMark extends Entity {
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
  label: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<PartMark>) {
    super(data);
  }
}

export interface PartMarkRelations {
  // describe navigational properties here
}

export type PartMarkWithRelations = PartMark & PartMarkRelations;
