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
import {PartCategory} from '../models';
import {PartCategoryRepository} from '../repositories';

export class PartCategoryPartCategoryController {
  constructor(
    @repository(PartCategoryRepository)
    protected partCategoryRepository: PartCategoryRepository,
  ) {}

  @get('/part-categories/{id}/part-categories', {
    responses: {
      '200': {
        description: 'Array of PartCategory has many PartCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PartCategory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PartCategory>,
  ): Promise<PartCategory[]> {
    return this.partCategoryRepository.partCategories(id).find(filter);
  }

  @post('/part-categories/{id}/part-categories', {
    responses: {
      '200': {
        description: 'PartCategory model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PartCategory)},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PartCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartCategory, {
            title: 'NewPartCategoryInPartCategory',
            exclude: ['id'],
            optional: ['partCategoryId'],
          }),
        },
      },
    })
    partCategory: Omit<PartCategory, 'id'>,
  ): Promise<PartCategory> {
    return this.partCategoryRepository.partCategories(id).create(partCategory);
  }

  @patch('/part-categories/{id}/part-categories', {
    responses: {
      '200': {
        description: 'PartCategory.PartCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartCategory, {partial: true}),
        },
      },
    })
    partCategory: Partial<PartCategory>,
    @param.query.object('where', getWhereSchemaFor(PartCategory))
    where?: Where<PartCategory>,
  ): Promise<Count> {
    return this.partCategoryRepository
      .partCategories(id)
      .patch(partCategory, where);
  }

  @del('/part-categories/{id}/part-categories', {
    responses: {
      '200': {
        description: 'PartCategory.PartCategory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PartCategory))
    where?: Where<PartCategory>,
  ): Promise<Count> {
    return this.partCategoryRepository.partCategories(id).delete(where);
  }
}
