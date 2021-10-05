import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources/exchange-parts-db-atlas.datasource';
import {PartCategory, PartCategoryRelations} from '../models';

export class PartCategoryRepository extends DefaultCrudRepository<
  PartCategory,
  typeof PartCategory.prototype.id,
  PartCategoryRelations
> {
  public readonly partCategory: BelongsToAccessor<
    PartCategory,
    typeof PartCategory.prototype.id
  >;

  public readonly partCategories: HasManyRepositoryFactory<
    PartCategory,
    typeof PartCategory.prototype.id
  >;

  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource,
    @repository.getter('PartCategoryRepository')
    protected partCategoryRepositoryGetter: Getter<PartCategoryRepository>,
  ) {
    super(PartCategory, dataSource);
    this.partCategories = this.createHasManyRepositoryFactoryFor(
      'partCategories',
      Getter.fromValue(this),
    );
    this.registerInclusionResolver(
      'partCategories',
      this.partCategories.inclusionResolver,
    );
    this.partCategory = this.createBelongsToAccessorFor(
      'parentPartCategory',
      Getter.fromValue(this),
    );
    this.registerInclusionResolver(
      'parentPartCategory',
      this.partCategory.inclusionResolver,
    );
  }
}
