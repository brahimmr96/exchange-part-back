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
import {VehicleMark} from '../models';
import {VehicleMarkRepository} from '../repositories';

export class VehicleMarkController {
  constructor(
    @repository(VehicleMarkRepository)
    public vehicleMarkRepository : VehicleMarkRepository,
  ) {}

  @post('/vehicle-marks')
  @response(200, {
    description: 'VehicleMark model instance',
    content: {'application/json': {schema: getModelSchemaRef(VehicleMark)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleMark, {
            title: 'NewVehicleMark',
            exclude: ['id'],
          }),
        },
      },
    })
    vehicleMark: Omit<VehicleMark, 'id'>,
  ): Promise<VehicleMark> {
    return this.vehicleMarkRepository.create(vehicleMark);
  }

  @get('/vehicle-marks/count')
  @response(200, {
    description: 'VehicleMark model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VehicleMark) where?: Where<VehicleMark>,
  ): Promise<Count> {
    return this.vehicleMarkRepository.count(where);
  }

  @get('/vehicle-marks')
  @response(200, {
    description: 'Array of VehicleMark model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VehicleMark, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VehicleMark) filter?: Filter<VehicleMark>,
  ): Promise<VehicleMark[]> {
    return this.vehicleMarkRepository.find(filter);
  }

  @patch('/vehicle-marks')
  @response(200, {
    description: 'VehicleMark PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleMark, {partial: true}),
        },
      },
    })
    vehicleMark: VehicleMark,
    @param.where(VehicleMark) where?: Where<VehicleMark>,
  ): Promise<Count> {
    return this.vehicleMarkRepository.updateAll(vehicleMark, where);
  }

  @get('/vehicle-marks/{id}')
  @response(200, {
    description: 'VehicleMark model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VehicleMark, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VehicleMark, {exclude: 'where'}) filter?: FilterExcludingWhere<VehicleMark>
  ): Promise<VehicleMark> {
    return this.vehicleMarkRepository.findById(id, filter);
  }

  @patch('/vehicle-marks/{id}')
  @response(204, {
    description: 'VehicleMark PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehicleMark, {partial: true}),
        },
      },
    })
    vehicleMark: VehicleMark,
  ): Promise<void> {
    await this.vehicleMarkRepository.updateById(id, vehicleMark);
  }

  @put('/vehicle-marks/{id}')
  @response(204, {
    description: 'VehicleMark PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vehicleMark: VehicleMark,
  ): Promise<void> {
    await this.vehicleMarkRepository.replaceById(id, vehicleMark);
  }

  @del('/vehicle-marks/{id}')
  @response(204, {
    description: 'VehicleMark DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vehicleMarkRepository.deleteById(id);
  }
}
