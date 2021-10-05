import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'ExchangePartsDbAtlas',
  connector: 'mongodb',
  url:
    'mongodb+srv://exchangeParts:ts5U7Qt40c4bYXCl@cluster0.hckvr.mongodb.net/exchangePartsDbAtlas?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: 'exchangeParts',
  password: 'ts5U7Qt40c4bYXCl',
  database: 'exchangePartsDbAtlas',
  useNewUrlParser: true,
};
/* const config = {
  name: 'exchangePartsDB',
  connector: 'mongodb',
  url: '',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'exchangePartsDB',
  useNewUrlParser: true,
}; */

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ExchangePartsDbAtlasDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'ExchangePartsDbAtlas';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.ExchangePartsDbAtlas', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
