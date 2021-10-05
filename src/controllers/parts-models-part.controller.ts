import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PartsModels,
  Part,
} from '../models';
import {PartsModelsRepository} from '../repositories';

export class PartsModelsPartController {
  constructor(
    @repository(PartsModelsRepository)
    public partsModelsRepository: PartsModelsRepository,
  ) { }

  @get('/parts-models/{id}/part', {
    responses: {
      '200': {
        description: 'Part belonging to PartsModels',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Part)},
          },
        },
      },
    },
  })
  async getPart(
    @param.path.string('id') id: typeof PartsModels.prototype.id,
  ): Promise<Part> {
    return this.partsModelsRepository.part(id);
  }
}
