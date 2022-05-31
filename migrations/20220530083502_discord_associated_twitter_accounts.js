/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('discord_associated_twitter_accounts', table => {

        table.string('discord_id').primary()
        table.string('twitter_id').notNullable()

        // Constraints
        table.unique('discord_id')
        table.unique('twitter_id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('discord_associated_twitter_accounts')
};
