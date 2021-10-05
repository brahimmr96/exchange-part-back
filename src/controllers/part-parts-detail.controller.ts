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
import {
  Part,
  PartsDetail,
} from '../models';
import {PartRepository} from '../repositories';

export class PartPartsDetailController {
  constructor(
    @repository(PartRepository) protected partRepository: PartRepository,
  ) { }

  @get('/parts/{id}/parts-details', {
    responses: {
      '200': {
        description: 'Array of Part has many PartsDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PartsDetail)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PartsDetail>,
  ): Promise<PartsDetail[]> {
    return this.partRepository.partsDetails(id).find(filter);
  }

  @post('/parts/{id}/parts-details', {
    responses: {
      '200': {
        description: 'Part model instance',
        content: {'application/json': {schema: getModelSchemaRef(PartsDetail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Part.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsDetail, {
            title: 'NewPartsDetailInPart',
            exclude: ['id'],
            optional: ['partId']
          }),
        },
      },
    }) partsDetail: Omit<PartsDetail, 'id'>,
  ): Promise<PartsDetail> {
    return this.partRepository.partsDetails(id).create(partsDetail);
  }

  @patch('/parts/{id}/parts-details', {
    responses: {
      '200': {
        description: 'Part.PartsDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PartsDetail, {partial: true}),
        },
      },
    })
    partsDetail: Partial<PartsDetail>,
    @param.query.object('where', getWhereSchemaFor(PartsDetail)) where?: Where<PartsDetail>,
  ): Promise<Count> {
    return this.partRepository.partsDetails(id).patch(partsDetail, where);
  }

  @del('/parts/{id}/parts-details', {
    responses: {
      '200': {
        description: 'Part.PartsDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PartsDetail)) where?: Where<PartsDetail>,
  ): Promise<Count> {
    return this.partRepository.partsDetails(id).delete(where);
  }
}
