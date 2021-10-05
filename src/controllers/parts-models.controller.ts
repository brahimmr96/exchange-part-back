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
import {PartsModels} from '../models';
import {PartsModelsRepository} from '../repositories';

export class PartsModelsController {
  constructor(
    @repository(PartsModelsRepository)
    public partsModelsRepository : PartsModelsRepository,
  ) {}

  @post('/parts-models')
  @response(200, {
    description: 'PartsModels model instance',
    content: {'application/json': {schema: getModelSchemaRef(PartsModels)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsModels, {
            title: 'NewPartsModels',
            exclude: ['id'],
          }),
        },
      },
    })
    partsModels: Omit<PartsModels, 'id'>,
  ): Promise<PartsModels> {
    return this.partsModelsRepository.create(partsModels);
  }

  @get('/parts-models/count')
  @response(200, {
    description: 'PartsModels model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PartsModels) where?: Where<PartsModels>,
  ): Promise<Count> {
    return this.partsModelsRepository.count(where);
  }

  @get('/parts-models')
  @response(200, {
    description: 'Array of PartsModels model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PartsModels, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PartsModels) filter?: Filter<PartsModels>,
  ): Promise<PartsModels[]> {
    return this.partsModelsRepository.find(filter);
  }

  @patch('/parts-models')
  @response(200, {
    description: 'PartsModels PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsModels, {partial: true}),
        },
      },
    })
    partsModels: PartsModels,
    @param.where(PartsModels) where?: Where<PartsModels>,
  ): Promise<Count> {
    return this.partsModelsRepository.updateAll(partsModels, where);
  }

  @get('/parts-models/{id}')
  @response(200, {
    description: 'PartsModels model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PartsModels, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PartsModels, {exclude: 'where'}) filter?: FilterExcludingWhere<PartsModels>
  ): Promise<PartsModels> {
    return this.partsModelsRepository.findById(id, filter);
  }

  @patch('/parts-models/{id}')
  @response(204, {
    description: 'PartsModels PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsModels, {partial: true}),
        },
      },
    })
    partsModels: PartsModels,
  ): Promise<void> {
    await this.partsModelsRepository.updateById(id, partsModels);
  }

  @put('/parts-models/{id}')
  @response(204, {
    description: 'PartsModels PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() partsModels: PartsModels,
  ): Promise<void> {
    await this.partsModelsRepository.replaceById(id, partsModels);
  }

  @del('/parts-models/{id}')
  @response(204, {
    description: 'PartsModels DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.partsModelsRepository.deleteById(id);
  }
}
