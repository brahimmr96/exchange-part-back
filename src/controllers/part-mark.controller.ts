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
import {PartMark} from '../models';
import {PartMarkRepository} from '../repositories';

export class PartMarkController {
  constructor(
    @repository(PartMarkRepository)
    public partMarkRepository : PartMarkRepository,
  ) {}

  @post('/part-marks')
  @response(200, {
    description: 'PartMark model instance',
    content: {'application/json': {schema: getModelSchemaRef(PartMark)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartMark, {
            title: 'NewPartMark',
            exclude: ['id'],
          }),
        },
      },
    })
    partMark: Omit<PartMark, 'id'>,
  ): Promise<PartMark> {
    return this.partMarkRepository.create(partMark);
  }

  @get('/part-marks/count')
  @response(200, {
    description: 'PartMark model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PartMark) where?: Where<PartMark>,
  ): Promise<Count> {
    return this.partMarkRepository.count(where);
  }

  @get('/part-marks')
  @response(200, {
    description: 'Array of PartMark model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PartMark, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PartMark) filter?: Filter<PartMark>,
  ): Promise<PartMark[]> {
    return this.partMarkRepository.find(filter);
  }

  @patch('/part-marks')
  @response(200, {
    description: 'PartMark PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartMark, {partial: true}),
        },
      },
    })
    partMark: PartMark,
    @param.where(PartMark) where?: Where<PartMark>,
  ): Promise<Count> {
    return this.partMarkRepository.updateAll(partMark, where);
  }

  @get('/part-marks/{id}')
  @response(200, {
    description: 'PartMark model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PartMark, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PartMark, {exclude: 'where'}) filter?: FilterExcludingWhere<PartMark>
  ): Promise<PartMark> {
    return this.partMarkRepository.findById(id, filter);
  }

  @patch('/part-marks/{id}')
  @response(204, {
    description: 'PartMark PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartMark, {partial: true}),
        },
      },
    })
    partMark: PartMark,
  ): Promise<void> {
    await this.partMarkRepository.updateById(id, partMark);
  }

  @put('/part-marks/{id}')
  @response(204, {
    description: 'PartMark PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() partMark: PartMark,
  ): Promise<void> {
    await this.partMarkRepository.replaceById(id, partMark);
  }

  @del('/part-marks/{id}')
  @response(204, {
    description: 'PartMark DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.partMarkRepository.deleteById(id);
  }
}
