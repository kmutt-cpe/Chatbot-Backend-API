import { RedisConfig } from './interfaces/redisConfig.interface';

export default (): RedisConfig => {
  return {
    redisConfig: {
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
      },
    },
  };
};
