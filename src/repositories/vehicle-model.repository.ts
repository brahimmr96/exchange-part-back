import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ExchangePartsDbAtlasDataSource} from '../datasources/exchange-parts-db-atlas.datasource';
import {
  PartsModels,
  VehicleMark,
  VehicleModel,
  VehicleModelRelations,
} from '../models';
import {PartsModelsRepository} from './parts-models.repository';
import {VehicleMarkRepository} from './vehicle-mark.repository';

export class VehicleModelRepository extends DefaultCrudRepository<
  VehicleModel,
  typeof VehicleModel.prototype.id,
  VehicleModelRelations
> {
  public readonly vehicleMark: BelongsToAccessor<
    VehicleMark,
    typeof VehicleModel.prototype.id
  >;

  public readonly vehicleModel: BelongsToAccessor<
    VehicleModel,
    typeof VehicleModel.prototype.id
  >;

  public readonly partsModels: HasManyRepositoryFactory<
    PartsModels,
    typeof VehicleModel.prototype.id
  >;

  constructor(
    @inject('datasources.ExchangePartsDbAtlas')
    dataSource: ExchangePartsDbAtlasDataSource,
    @repository.getter('VehicleMarkRepository')
    protected vehicleMarkRepositoryGetter: Getter<VehicleMarkRepository>,
    @repository.getter('VehicleModelRepository')
    protected vehicleModelRepositoryGetter: Getter<VehicleModelRepository>,
    @repository.getter('PartsModelsRepository')
    protected partsModelsRepositoryGetter: Getter<PartsModelsRepository>,
  ) {
    super(VehicleModel, dataSource);
    this.partsModels = this.createHasManyRepositoryFactoryFor(
      'partsModels',
      partsModelsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'partsModels',
      this.partsModels.inclusionResolver,
    );

    this.vehicleModel = this.createBelongsToAccessorFor(
      'vehicleModel',
      Getter.fromValue(this),
    );
    this.registerInclusionResolver(
      'vehicleModel',
      this.vehicleModel.inclusionResolver,
    );
    this.vehicleMark = this.createBelongsToAccessorFor(
      'vehicleMark',
      vehicleMarkRepositoryGetter,
    );
    this.registerInclusionResolver(
      'vehicleMark',
      this.vehicleMark.inclusionResolver,
    );
  }
}
