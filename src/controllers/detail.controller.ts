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
import {Detail} from '../models';
import {DetailRepository} from '../repositories';

export class DetailController {
  constructor(
    @repository(DetailRepository)
    public detailRepository : DetailRepository,
  ) {}

  @post('/details')
  @response(200, {
    description: 'Detail model instance',
    content: {'application/json': {schema: getModelSchemaRef(Detail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detail, {
            title: 'NewDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    detail: Omit<Detail, 'id'>,
  ): Promise<Detail> {
    return this.detailRepository.create(detail);
  }

  @get('/details/count')
  @response(200, {
    description: 'Detail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Detail) where?: Where<Detail>,
  ): Promise<Count> {
    return this.detailRepository.count(where);
  }

  @get('/details')
  @response(200, {
    description: 'Array of Detail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Detail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Detail) filter?: Filter<Detail>,
  ): Promise<Detail[]> {
    return this.detailRepository.find(filter);
  }

  @patch('/details')
  @response(200, {
    description: 'Detail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detail, {partial: true}),
        },
      },
    })
    detail: Detail,
    @param.where(Detail) where?: Where<Detail>,
  ): Promise<Count> {
    return this.detailRepository.updateAll(detail, where);
  }

  @get('/details/{id}')
  @response(200, {
    description: 'Detail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Detail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Detail, {exclude: 'where'}) filter?: FilterExcludingWhere<Detail>
  ): Promise<Detail> {
    return this.detailRepository.findById(id, filter);
  }

  @patch('/details/{id}')
  @response(204, {
    description: 'Detail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detail, {partial: true}),
        },
      },
    })
    detail: Detail,
  ): Promise<void> {
    await this.detailRepository.updateById(id, detail);
  }

  @put('/details/{id}')
  @response(204, {
    description: 'Detail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detail: Detail,
  ): Promise<void> {
    await this.detailRepository.replaceById(id, detail);
  }

  @del('/details/{id}')
  @response(204, {
    description: 'Detail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detailRepository.deleteById(id);
  }
}
