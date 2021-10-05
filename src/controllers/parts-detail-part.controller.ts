import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PartsDetail,
  Part,
} from '../models';
import {PartsDetailRepository} from '../repositories';

export class PartsDetailPartController {
  constructor(
    @repository(PartsDetailRepository)
    public partsDetailRepository: PartsDetailRepository,
  ) { }

  @get('/parts-details/{id}/part', {
    responses: {
      '200': {
        description: 'Part belonging to PartsDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Part)},
          },
        },
      },
    },
  })
  async getPart(
    @param.path.string('id') id: typeof PartsDetail.prototype.id,
  ): Promise<Part> {
    return this.partsDetailRepository.part(id);
  }
}
