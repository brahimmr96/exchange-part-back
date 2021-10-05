import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources/exchange-parts-db-atlas.datasource';
import {PartsModels, PartsModelsRelations, Part, VehicleModel} from '../models';
import {PartRepository} from './part.repository';
import {VehicleModelRepository} from './vehicle-model.repository';

export class PartsModelsRepository extends DefaultCrudRepository<
  PartsModels,
  typeof PartsModels.prototype.id,
  PartsModelsRelations
> {

  public readonly part: BelongsToAccessor<Part, typeof PartsModels.prototype.id>;

  public readonly vehicleModel: BelongsToAccessor<VehicleModel, typeof PartsModels.prototype.id>;

  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource, @repository.getter('PartRepository') protected partRepositoryGetter: Getter<PartRepository>, @repository.getter('VehicleModelRepository') protected vehicleModelRepositoryGetter: Getter<VehicleModelRepository>,
  ) {
    super(PartsModels, dataSource);
    this.vehicleModel = this.createBelongsToAccessorFor('vehicleModel', vehicleModelRepositoryGetter,);
    this.registerInclusionResolver('vehicleModel', this.vehicleModel.inclusionResolver);
    this.part = this.createBelongsToAccessorFor('part', partRepositoryGetter,);
    this.registerInclusionResolver('part', this.part.inclusionResolver);
  }
}
