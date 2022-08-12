import dotenv from 'dotenv';
dotenv.config();

const { DATABASE_PWD } = process.env;

const config = {
    development: {
        username: 'root',
        password: DATABASE_PWD,
        database: 'magazine',
        host: '127.0.0.1',
        dialect: 'mysql',
    },

    test: {
        username: 'root',
        password: null,
        database: 'test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },

    production: {
        username: 'root',
        password: null,
        database: 'test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};

export default config;