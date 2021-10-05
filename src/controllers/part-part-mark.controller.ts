import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Part,
  PartMark,
} from '../models';
import {PartRepository} from '../repositories';

export class PartPartMarkController {
  constructor(
    @repository(PartRepository)
    public partRepository: PartRepository,
  ) { }

  @get('/parts/{id}/part-mark', {
    responses: {
      '200': {
        description: 'PartMark belonging to Part',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PartMark)},
          },
        },
      },
    },
  })
  async getPartMark(
    @param.path.string('id') id: typeof Part.prototype.id,
  ): Promise<PartMark> {
    return this.partRepository.partMark(id);
  }
}
