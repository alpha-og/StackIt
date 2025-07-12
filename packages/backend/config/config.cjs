module.exports = {
    development: {
        username: "postgres",
        password: "postgres",
        database: "stackit_dev",
        host: "127.0.0.1",
        port: 5432,
        dialect: "postgres",
        logging: true,
    },
    test: {
        username: "postgres",
        password: "postgres",
        database: "stackit_test",
        host: "127.0.0.1",
        port: 5432,
        dialect: "postgres",
        logging: false,
    },
    production: {
        username: "your_prod_user",
        password: "your_secure_password",
        database: "stackit_prod",
        host: "prod-db-host.com",
        port: 5432,
        dialect: "postgres",
        logging: false,
    },
};
