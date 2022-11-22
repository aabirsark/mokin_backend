import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'mokinDb',
  entities: ['dist/src/**/*.entity.js'],
};

export default config;
