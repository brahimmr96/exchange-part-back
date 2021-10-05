import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources/exchange-parts-db-atlas.datasource';
import {Detail, Part, PartsDetail, PartsDetailRelations} from '../models';
import {DetailRepository} from './detail.repository';
import {PartRepository} from './part.repository';

export class PartsDetailRepository extends DefaultCrudRepository<
  PartsDetail,
  typeof PartsDetail.prototype.id,
  PartsDetailRelations
> {
  public readonly part: BelongsToAccessor<
    Part,
    typeof PartsDetail.prototype.id
  >;

  public readonly detail: BelongsToAccessor<
    Detail,
    typeof PartsDetail.prototype.id
  >;

  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource,
    @repository.getter('PartRepository')
    protected partRepositoryGetter: Getter<PartRepository>,
    @repository.getter('DetailRepository')
    protected detailRepositoryGetter: Getter<DetailRepository>,
  ) {
    super(PartsDetail, dataSource);
    this.detail = this.createBelongsToAccessorFor(
      'detail',
      detailRepositoryGetter,
    );
    this.registerInclusionResolver('detail', this.detail.inclusionResolver);
    this.part = this.createBelongsToAccessorFor('part', partRepositoryGetter);
    this.registerInclusionResolver('part', this.part.inclusionResolver);
  }
}
