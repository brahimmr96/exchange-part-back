import {Entity, model, property} from '@loopback/repository';

@model()
export class Detail extends Entity {
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
    required: true,
  })
  categoryId: string;


  constructor(data?: Partial<Detail>) {
    super(data);
  }
}

export interface DetailRelations {
  // describe navigational properties here
}

export type DetailWithRelations = Detail & DetailRelations;
