import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {PartCategory} from '../models';
import {PartCategoryRepository} from '../repositories';

export class PartCategoryController {
  constructor(
    @repository(PartCategoryRepository)
    public partCategoryRepository: PartCategoryRepository,
  ) {}

  @post('/part-categories')
  @response(200, {
    description: 'PartCategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(PartCategory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartCategory, {
            title: 'NewPartCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    partCategory: Omit<PartCategory, 'id'>,
  ): Promise<PartCategory> {
    return this.partCategoryRepository.create(partCategory);
  }

  @get('/part-categories/count')
  @response(200, {
    description: 'PartCategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PartCategory) where?: Where<PartCategory>,
  ): Promise<Count> {
    return this.partCategoryRepository.count(where);
  }

  @get('/part-categories')
  @response(200, {
    description: 'Array of PartCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PartCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PartCategory) filter?: Filter<PartCategory>,
  ): Promise<PartCategory[]> {
    return this.partCategoryRepository.find(filter);
  }

  @patch('/part-categories')
  @response(200, {
    description: 'PartCategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartCategory, {partial: true}),
        },
      },
    })
    partCategory: PartCategory,
    @param.where(PartCategory) where?: Where<PartCategory>,
  ): Promise<Count> {
    return this.partCategoryRepository.updateAll(partCategory, where);
  }

  @get('/part-categories/{id}')
  @response(200, {
    description: 'PartCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PartCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PartCategory, {exclude: 'where'})
    filter?: FilterExcludingWhere<PartCategory>,
  ): Promise<PartCategory> {
    return this.partCategoryRepository.findById(id, filter);
  }

  @patch('/part-categories/{id}')
  @response(204, {
    description: 'PartCategory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartCategory, {partial: true}),
        },
      },
    })
    partCategory: PartCategory,
  ): Promise<void> {
    await this.partCategoryRepository.updateById(id, partCategory);
  }

  @put('/part-categories/{id}')
  @response(204, {
    description: 'PartCategory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() partCategory: PartCategory,
  ): Promise<void> {
    await this.partCategoryRepository.replaceById(id, partCategory);
  }

  @del('/part-categories/{id}')
  @response(204, {
    description: 'PartCategory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.partCategoryRepository.deleteById(id);
  }
}
