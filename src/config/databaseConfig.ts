import { DatabaseConfig } from './interfaces/databaseConfig.interface';

export default (): DatabaseConfig => {
  return {
    databaseConfig: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    },
  };
};
