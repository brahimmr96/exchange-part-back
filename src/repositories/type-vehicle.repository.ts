import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources/exchange-parts-db-atlas.datasource';
import {TypeVehicle, TypeVehicleRelations} from '../models';

export class TypeVehicleRepository extends DefaultCrudRepository<
  TypeVehicle,
  typeof TypeVehicle.prototype.id,
  TypeVehicleRelations
> {
  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource,
  ) {
    super(TypeVehicle, dataSource);
  }
}
