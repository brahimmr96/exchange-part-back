import {inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources/exchange-parts-db-atlas.datasource';
import {VehicleMark, VehicleModel} from '../models';

export class VehicleMarkRepository extends DefaultCrudRepository<
  VehicleMark,
  typeof VehicleMark.prototype.id
> {
  public readonly vehicleModels: HasManyRepositoryFactory<
    VehicleModel,
    typeof VehicleMark.prototype.id
  >;

  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource,
  ) {
    super(VehicleMark, dataSource);
  }
}
