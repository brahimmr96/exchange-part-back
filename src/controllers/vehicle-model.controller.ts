import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {VehicleModel} from '../models';
import {VehicleModelRepository} from '../repositories';

export class VehicleModelController {
  constructor(
    @repository(VehicleModelRepository)
    public vehicleModelRepository : VehicleModelRepository,
  ) {}

  @post('/vehicle-models')
  @response(200, {
    description: 'VehicleModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(VehicleModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleModel, {
            title: 'NewVehicleModel',
            exclude: ['id'],
          }),
        },
      },
    })
    vehicleModel: Omit<VehicleModel, 'id'>,
  ): Promise<VehicleModel> {
    return this.vehicleModelRepository.create(vehicleModel);
  }

  @get('/vehicle-models/count')
  @response(200, {
    description: 'VehicleModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VehicleModel) where?: Where<VehicleModel>,
  ): Promise<Count> {
    return this.vehicleModelRepository.count(where);
  }

  @get('/vehicle-models')
  @response(200, {
    description: 'Array of VehicleModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VehicleModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VehicleModel) filter?: Filter<VehicleModel>,
  ): Promise<VehicleModel[]> {
    return this.vehicleModelRepository.find(filter);
  }

  @patch('/vehicle-models')
  @response(200, {
    description: 'VehicleModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleModel, {partial: true}),
        },
      },
    })
    vehicleModel: VehicleModel,
    @param.where(VehicleModel) where?: Where<VehicleModel>,
  ): Promise<Count> {
    return this.vehicleModelRepository.updateAll(vehicleModel, where);
  }

  @get('/vehicle-models/{id}')
  @response(200, {
    description: 'VehicleModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VehicleModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VehicleModel, {exclude: 'where'}) filter?: FilterExcludingWhere<VehicleModel>
  ): Promise<VehicleModel> {
    return this.vehicleModelRepository.findById(id, filter);
  }

  @patch('/vehicle-models/{id}')
  @response(204, {
    description: 'VehicleModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleModel, {partial: true}),
        },
      },
    })
    vehicleModel: VehicleModel,
  ): Promise<void> {
    await this.vehicleModelRepository.updateById(id, vehicleModel);
  }

  @put('/vehicle-models/{id}')
  @response(204, {
    description: 'VehicleModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vehicleModel: VehicleModel,
  ): Promise<void> {
    await this.vehicleModelRepository.replaceById(id, vehicleModel);
  }

  @del('/vehicle-models/{id}')
  @response(204, {
    description: 'VehicleModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vehicleModelRepository.deleteById(id);
  }
}
