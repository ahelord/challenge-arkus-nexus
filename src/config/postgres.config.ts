import './dotenv.config';
const PostgresConfig = {
  type: process.env.TYPEORM_TYPE,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  logging: true,
  synchronize: process.env.TYPEORM_SYNC === 'true',
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default PostgresConfig;
