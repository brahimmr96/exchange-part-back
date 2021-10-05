import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources/exchange-parts-db-atlas.datasource';
import {Detail, DetailRelations} from '../models';

export class DetailRepository extends DefaultCrudRepository<
  Detail,
  typeof Detail.prototype.id,
  DetailRelations
> {
  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource,
  ) {
    super(Detail, dataSource);
  }
}
