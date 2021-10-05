import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {PartsModels, VehicleModel} from '../models';
import {VehicleModelRepository} from '../repositories';

export class VehicleModelPartsModelsController {
  constructor(
    @repository(VehicleModelRepository)
    protected vehicleModelRepository: VehicleModelRepository,
  ) {}

  @get('/vehicle-models/{id}/parts-models', {
    responses: {
      '200': {
        description: 'Array of VehicleModel has many PartsModels',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PartsModels)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PartsModels>,
  ): Promise<PartsModels[]> {
    return this.vehicleModelRepository.partsModels(id).find(filter);
  }

  @post('/vehicle-models/{id}/parts-models', {
    responses: {
      '200': {
        description: 'VehicleModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(PartsModels)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof VehicleModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsModels, {
            title: 'NewPartsModelsInVehicleModel',
            exclude: ['id'],
            optional: ['vehicleModelId'],
          }),
        },
      },
    })
    partsModels: Omit<PartsModels, 'id'>,
  ): Promise<PartsModels> {
    return this.vehicleModelRepository.partsModels(id).create(partsModels);
  }

  @patch('/vehicle-models/{id}/parts-models', {
    responses: {
      '200': {
        description: 'VehicleModel.PartsModels PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsModels, {partial: true}),
        },
      },
    })
    partsModels: Partial<PartsModels>,
    @param.query.object('where', getWhereSchemaFor(PartsModels))
    where?: Where<PartsModels>,
  ): Promise<Count> {
    return this.vehicleModelRepository
      .partsModels(id)
      .patch(partsModels, where);
  }

  @del('/vehicle-models/{id}/parts-models', {
    responses: {
      '200': {
        description: 'VehicleModel.PartsModels DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PartsModels))
    where?: Where<PartsModels>,
  ): Promise<Count> {
    return this.vehicleModelRepository.partsModels(id).delete(where);
  }
}
