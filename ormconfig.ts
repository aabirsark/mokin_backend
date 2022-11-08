import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'mokinDb',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  logging: true,
};

export default config;