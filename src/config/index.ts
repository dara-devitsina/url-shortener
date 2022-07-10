import {ConnectionOptions} from "typeorm";

const { env } = process;
const PRODUCTION: boolean = String(env.PRODUCTION || false).toLowerCase() == "true";
if (!PRODUCTION) {
    require('dotenv').config({ path: __dirname+'/../../.env' });
}

export const LOCAL_DOMAIN = env.LOCAL_DOMAIN;
export const PORT = env.PORT || 3000;

export const ORMConfig = {
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: parseInt(env.POSTGRES_PORT) || 5432,
    database: env.POSTGRES_DB,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/migrations/*{.ts,.js}'],
    cli: {
        entitiesDir: 'src/**/*.entity{.ts,.js}',
        migrationsDir: 'src/migrations',
    },
} as ConnectionOptions;


export default () => ({
    PORT,
    DB: ORMConfig,
    LOCAL_DOMAIN
});