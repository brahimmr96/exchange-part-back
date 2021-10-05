import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources/exchange-parts-db-atlas.datasource';
import {
  Part,
  PartCategory,
  PartMark,
  PartRelations,
  PartsDetail,
  PartsModels,
} from '../models';
import {PartCategoryRepository} from './part-category.repository';
import {PartMarkRepository} from './part-mark.repository';
import {PartsDetailRepository} from './parts-detail.repository';
import {PartsModelsRepository} from './parts-models.repository';
import {VehicleModelRepository} from './vehicle-model.repository';

export class PartRepository extends DefaultCrudRepository<
  Part,
  typeof Part.prototype.id,
  PartRelations
> {
  public readonly partCategory: BelongsToAccessor<
    PartCategory,
    typeof Part.prototype.id
  >;

  public readonly partMark: BelongsToAccessor<
    PartMark,
    typeof Part.prototype.id
  >;

  public readonly partsDetails: HasManyRepositoryFactory<
    PartsDetail,
    typeof Part.prototype.id
  >;

  public readonly partsModels: HasManyRepositoryFactory<
    PartsModels,
    typeof Part.prototype.id
  >;
  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource,
    @repository.getter('PartCategoryRepository')
    protected partCategoryRepositoryGetter: Getter<PartCategoryRepository>,
    @repository.getter('PartMarkRepository')
    protected partMarkRepositoryGetter: Getter<PartMarkRepository>,
    @repository.getter('PartsDetailRepository')
    protected partsDetailRepositoryGetter: Getter<PartsDetailRepository>,
    @repository.getter('VehicleModelRepository')
    protected vehicleModelRepositoryGetter: Getter<VehicleModelRepository>,
    @repository.getter('PartsModelsRepository')
    protected partsModelsRepositoryGetter: Getter<PartsModelsRepository>,
  ) {
    super(Part, dataSource);
    this.partsModels = this.createHasManyRepositoryFactoryFor(
      'partsModels',
      partsModelsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'partsModels',
      this.partsModels.inclusionResolver,
    );
    this.partsDetails = this.createHasManyRepositoryFactoryFor(
      'partsDetails',
      partsDetailRepositoryGetter,
    );
    this.registerInclusionResolver(
      'partsDetails',
      this.partsDetails.inclusionResolver,
    );
    this.partMark = this.createBelongsToAccessorFor(
      'partMark',
      partMarkRepositoryGetter,
    );
    this.registerInclusionResolver('partMark', this.partMark.inclusionResolver);
    this.partCategory = this.createBelongsToAccessorFor(
      'partCategory',
      partCategoryRepositoryGetter,
    );
    this.registerInclusionResolver(
      'partCategory',
      this.partCategory.inclusionResolver,
    );
  }
}
