import { DatabaseConfig } from './interfaces/databaseConfig.interface';

const resolveBoolean = (value) => (value === true || value === 'true' ? true : false);

export default (): DatabaseConfig => {
  const dbConfig = {
    databaseConfig: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: resolveBoolean(process.env.DB_SYNCHRONIZE),
      retryDelay: 10000,
    },
  };
  return dbConfig;
};
