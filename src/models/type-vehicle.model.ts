import {Entity, model, property} from '@loopback/repository';

@model()
export class TypeVehicle extends Entity {
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


  constructor(data?: Partial<TypeVehicle>) {
    super(data);
  }
}

export interface TypeVehicleRelations {
  // describe navigational properties here
}

export type TypeVehicleWithRelations = TypeVehicle & TypeVehicleRelations;
