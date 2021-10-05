import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources';
import {Admin, AdminRelations} from '../models';

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.id,
  AdminRelations
> {
  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource,
  ) {
    super(Admin, dataSource);
  }
}
