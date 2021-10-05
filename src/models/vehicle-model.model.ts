import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {PartsModels} from './parts-models.model';
import {VehicleMark} from './vehicle-mark.model';

@model()
export class VehicleModel extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  reference: string;

  @belongsTo(() => VehicleMark)
  vehicleMarkId: string;

  @belongsTo(() => VehicleModel)
  vehicleModelId: string;

  @hasMany(() => PartsModels)
  partsModels: PartsModels[];

  constructor(data?: Partial<VehicleModel>) {
    super(data);
  }
}

export interface VehicleModelRelations {
  // describe navigational properties here
}

export type VehicleModelWithRelations = VehicleModel & VehicleModelRelations;
