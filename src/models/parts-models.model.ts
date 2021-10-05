import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Part} from './part.model';
import {VehicleModel} from './vehicle-model.model';

@model()
export class PartsModels extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @belongsTo(() => Part, {name: 'part'})
  partId: string;

  @belongsTo(() => VehicleModel)
  vehicleModelId: string;

  constructor(data?: Partial<PartsModels>) {
    super(data);
  }
}

export interface PartsModelsRelations {
  // describe navigational properties here
}

export type PartsCategoriesWithRelations = PartsModels & PartsModelsRelations;
