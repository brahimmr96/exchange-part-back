import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VehicleModel,
  VehicleMark,
} from '../models';
import {VehicleModelRepository} from '../repositories';

export class VehicleModelVehicleMarkController {
  constructor(
    @repository(VehicleModelRepository)
    public vehicleModelRepository: VehicleModelRepository,
  ) { }

  @get('/vehicle-models/{id}/vehicle-mark', {
    responses: {
      '200': {
        description: 'VehicleMark belonging to VehicleModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VehicleMark)},
          },
        },
      },
    },
  })
  async getVehicleMark(
    @param.path.string('id') id: typeof VehicleModel.prototype.id,
  ): Promise<VehicleMark> {
    return this.vehicleModelRepository.vehicleMark(id);
  }
}
