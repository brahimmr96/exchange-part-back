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
import {TypeVehicle} from '../models';
import {TypeVehicleRepository} from '../repositories';

export class TypeVehicleController {
  constructor(
    @repository(TypeVehicleRepository)
    public typeVehicleRepository : TypeVehicleRepository,
  ) {}

  @post('/type-vehicles')
  @response(200, {
    description: 'TypeVehicle model instance',
    content: {'application/json': {schema: getModelSchemaRef(TypeVehicle)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeVehicle, {
            title: 'NewTypeVehicle',
            exclude: ['id'],
          }),
        },
      },
    })
    typeVehicle: Omit<TypeVehicle, 'id'>,
  ): Promise<TypeVehicle> {
    return this.typeVehicleRepository.create(typeVehicle);
  }

  @get('/type-vehicles/count')
  @response(200, {
    description: 'TypeVehicle model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TypeVehicle) where?: Where<TypeVehicle>,
  ): Promise<Count> {
    return this.typeVehicleRepository.count(where);
  }

  @get('/type-vehicles')
  @response(200, {
    description: 'Array of TypeVehicle model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TypeVehicle, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TypeVehicle) filter?: Filter<TypeVehicle>,
  ): Promise<TypeVehicle[]> {
    return this.typeVehicleRepository.find(filter);
  }

  @patch('/type-vehicles')
  @response(200, {
    description: 'TypeVehicle PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeVehicle, {partial: true}),
        },
      },
    })
    typeVehicle: TypeVehicle,
    @param.where(TypeVehicle) where?: Where<TypeVehicle>,
  ): Promise<Count> {
    return this.typeVehicleRepository.updateAll(typeVehicle, where);
  }

  @get('/type-vehicles/{id}')
  @response(200, {
    description: 'TypeVehicle model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TypeVehicle, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TypeVehicle, {exclude: 'where'}) filter?: FilterExcludingWhere<TypeVehicle>
  ): Promise<TypeVehicle> {
    return this.typeVehicleRepository.findById(id, filter);
  }

  @patch('/type-vehicles/{id}')
  @response(204, {
    description: 'TypeVehicle PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeVehicle, {partial: true}),
        },
      },
    })
    typeVehicle: TypeVehicle,
  ): Promise<void> {
    await this.typeVehicleRepository.updateById(id, typeVehicle);
  }

  @put('/type-vehicles/{id}')
  @response(204, {
    description: 'TypeVehicle PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() typeVehicle: TypeVehicle,
  ): Promise<void> {
    await this.typeVehicleRepository.replaceById(id, typeVehicle);
  }

  @del('/type-vehicles/{id}')
  @response(204, {
    description: 'TypeVehicle DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.typeVehicleRepository.deleteById(id);
  }
}
