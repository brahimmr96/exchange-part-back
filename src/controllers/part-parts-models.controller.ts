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
import {Part, PartsModels} from '../models';
import {PartRepository} from '../repositories';

export class PartPartsModelsController {
  constructor(
    @repository(PartRepository) protected partRepository: PartRepository,
  ) {}

  @get('/parts/{id}/parts-models', {
    responses: {
      '200': {
        description: 'Array of Part has many PartsModels',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PartsModels)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PartsModels>,
  ): Promise<PartsModels[]> {
    return this.partRepository.partsModels(id).find(filter);
  }

  @post('/parts/{id}/parts-models', {
    responses: {
      '200': {
        description: 'Part model instance',
        content: {'application/json': {schema: getModelSchemaRef(PartsModels)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Part.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsModels, {
            title: 'NewPartsModelsInPart',
            exclude: ['id'],
            optional: ['partId'],
          }),
        },
      },
    })
    partsModels: Omit<PartsModels, 'id'>,
  ): Promise<PartsModels> {
    return this.partRepository.partsModels(id).create(partsModels);
  }

  @patch('/parts/{id}/parts-models', {
    responses: {
      '200': {
        description: 'Part.PartsModels PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsModels, {partial: true}),
        },
      },
    })
    partsModels: Partial<PartsModels>,
    @param.query.object('where', getWhereSchemaFor(PartsModels))
    where?: Where<PartsModels>,
  ): Promise<Count> {
    return this.partRepository.partsModels(id).patch(partsModels, where);
  }

  @del('/parts/{id}/parts-models', {
    responses: {
      '200': {
        description: 'Part.PartsModels DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PartsModels))
    where?: Where<PartsModels>,
  ): Promise<Count> {
    return this.partRepository.partsModels(id).delete(where);
  }
}
