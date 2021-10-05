import {Entity, model, property} from '@loopback/repository';
import {VehicleModel} from './vehicle-model.model';

@model()
export class VehicleMark extends Entity {
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
}
export interface VehicleMarkRelations {
  // describe navigational properties here
}

export type VehicleMarkWithRelations = VehicleModel & VehicleMarkRelations;
