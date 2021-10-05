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
  Detail,
} from '../models';
import {PartsDetailRepository} from '../repositories';

export class PartsDetailDetailController {
  constructor(
    @repository(PartsDetailRepository)
    public partsDetailRepository: PartsDetailRepository,
  ) { }

  @get('/parts-details/{id}/detail', {
    responses: {
      '200': {
        description: 'Detail belonging to PartsDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Detail)},
          },
        },
      },
    },
  })
  async getDetail(
    @param.path.string('id') id: typeof PartsDetail.prototype.id,
  ): Promise<Detail> {
    return this.partsDetailRepository.detail(id);
  }
}
