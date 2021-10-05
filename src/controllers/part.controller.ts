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
import {Part} from '../models';
import {PartRepository} from '../repositories';

export class PartController {
  constructor(
    @repository(PartRepository)
    public partRepository : PartRepository,
  ) {}

  @post('/parts')
  @response(200, {
    description: 'Part model instance',
    content: {'application/json': {schema: getModelSchemaRef(Part)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Part, {
            title: 'NewPart',
            exclude: ['id'],
          }),
        },
      },
    })
    part: Omit<Part, 'id'>,
  ): Promise<Part> {
    return this.partRepository.create(part);
  }

  @get('/parts/count')
  @response(200, {
    description: 'Part model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Part) where?: Where<Part>,
  ): Promise<Count> {
    return this.partRepository.count(where);
  }

  @get('/parts')
  @response(200, {
    description: 'Array of Part model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Part, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Part) filter?: Filter<Part>,
  ): Promise<Part[]> {
    return this.partRepository.find(filter);
  }

  @patch('/parts')
  @response(200, {
    description: 'Part PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Part, {partial: true}),
        },
      },
    })
    part: Part,
    @param.where(Part) where?: Where<Part>,
  ): Promise<Count> {
    return this.partRepository.updateAll(part, where);
  }

  @get('/parts/{id}')
  @response(200, {
    description: 'Part model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Part, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Part, {exclude: 'where'}) filter?: FilterExcludingWhere<Part>
  ): Promise<Part> {
    return this.partRepository.findById(id, filter);
  }

  @patch('/parts/{id}')
  @response(204, {
    description: 'Part PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Part, {partial: true}),
        },
      },
    })
    part: Part,
  ): Promise<void> {
    await this.partRepository.updateById(id, part);
  }

  @put('/parts/{id}')
  @response(204, {
    description: 'Part PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() part: Part,
  ): Promise<void> {
    await this.partRepository.replaceById(id, part);
  }

  @del('/parts/{id}')
  @response(204, {
    description: 'Part DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.partRepository.deleteById(id);
  }
}
