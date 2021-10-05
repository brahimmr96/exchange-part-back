import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources/exchange-parts-db-atlas.datasource';
import {PartMark, PartMarkRelations} from '../models';

export class PartMarkRepository extends DefaultCrudRepository<
  PartMark,
  typeof PartMark.prototype.id,
  PartMarkRelations
> {
  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource,
  ) {
    super(PartMark, dataSource);
  }
}
