import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {VehicleModel} from '../models';
import {VehicleModelRepository} from '../repositories';

export class VehicleModelVehicleModelController {
  constructor(
    @repository(VehicleModelRepository)
    public vehicleModelRepository: VehicleModelRepository,
  ) {}

  @get('/vehicle-models/{id}/vehicle-model', {
    responses: {
      '200': {
        description: 'VehicleModel belonging to VehicleModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VehicleModel)},
          },
        },
      },
    },
  })
  async getVehicleModel(
    @param.path.string('id') id: typeof VehicleModel.prototype.id,
  ): Promise<VehicleModel> {
    return this.vehicleModelRepository.vehicleModel(id);
  }
}
