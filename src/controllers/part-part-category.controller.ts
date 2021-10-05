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
  PartCategory,
} from '../models';
import {PartRepository} from '../repositories';

export class PartPartCategoryController {
  constructor(
    @repository(PartRepository)
    public partRepository: PartRepository,
  ) { }

  @get('/parts/{id}/part-category', {
    responses: {
      '200': {
        description: 'PartCategory belonging to Part',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PartCategory)},
          },
        },
      },
    },
  })
  async getPartCategory(
    @param.path.string('id') id: typeof Part.prototype.id,
  ): Promise<PartCategory> {
    return this.partRepository.partCategory(id);
  }
}
