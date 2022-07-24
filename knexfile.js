// Update with your config settings.
const { config } = require('./config')
const { PG_DATABASE_NAME, PG_USER, PG_DATABASE_PASSWORD } = config
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: PG_DATABASE_NAME,
            user: PG_USER,
            password: PG_DATABASE_PASSWORD
        },
    },

};
