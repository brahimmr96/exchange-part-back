import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PartsModels,
  VehicleModel,
} from '../models';
import {PartsModelsRepository} from '../repositories';

export class PartsModelsVehicleModelController {
  constructor(
    @repository(PartsModelsRepository)
    public partsModelsRepository: PartsModelsRepository,
  ) { }

  @get('/parts-models/{id}/vehicle-model', {
    responses: {
      '200': {
        description: 'VehicleModel belonging to PartsModels',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VehicleModel)},
          },
        },
      },
    },
  })
  async getVehicleModel(
    @param.path.string('id') id: typeof PartsModels.prototype.id,
  ): Promise<VehicleModel> {
    return this.partsModelsRepository.vehicleModel(id);
  }
}
