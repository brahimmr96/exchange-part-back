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
import {PartsDetail} from '../models';
import {PartsDetailRepository} from '../repositories';

export class PartsDetailsController {
  constructor(
    @repository(PartsDetailRepository)
    public partsDetailRepository : PartsDetailRepository,
  ) {}

  @post('/parts-details')
  @response(200, {
    description: 'PartsDetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(PartsDetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsDetail, {
            title: 'NewPartsDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    partsDetail: Omit<PartsDetail, 'id'>,
  ): Promise<PartsDetail> {
    return this.partsDetailRepository.create(partsDetail);
  }

  @get('/parts-details/count')
  @response(200, {
    description: 'PartsDetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PartsDetail) where?: Where<PartsDetail>,
  ): Promise<Count> {
    return this.partsDetailRepository.count(where);
  }

  @get('/parts-details')
  @response(200, {
    description: 'Array of PartsDetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PartsDetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PartsDetail) filter?: Filter<PartsDetail>,
  ): Promise<PartsDetail[]> {
    return this.partsDetailRepository.find(filter);
  }

  @patch('/parts-details')
  @response(200, {
    description: 'PartsDetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsDetail, {partial: true}),
        },
      },
    })
    partsDetail: PartsDetail,
    @param.where(PartsDetail) where?: Where<PartsDetail>,
  ): Promise<Count> {
    return this.partsDetailRepository.updateAll(partsDetail, where);
  }

  @get('/parts-details/{id}')
  @response(200, {
    description: 'PartsDetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PartsDetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PartsDetail, {exclude: 'where'}) filter?: FilterExcludingWhere<PartsDetail>
  ): Promise<PartsDetail> {
    return this.partsDetailRepository.findById(id, filter);
  }

  @patch('/parts-details/{id}')
  @response(204, {
    description: 'PartsDetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsDetail, {partial: true}),
        },
      },
    })
    partsDetail: PartsDetail,
  ): Promise<void> {
    await this.partsDetailRepository.updateById(id, partsDetail);
  }

  @put('/parts-details/{id}')
  @response(204, {
    description: 'PartsDetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() partsDetail: PartsDetail,
  ): Promise<void> {
    await this.partsDetailRepository.replaceById(id, partsDetail);
  }

  @del('/parts-details/{id}')
  @response(204, {
    description: 'PartsDetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.partsDetailRepository.deleteById(id);
  }
}
