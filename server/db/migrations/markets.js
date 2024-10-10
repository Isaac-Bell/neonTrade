/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('markets', (table) => {
    table.increments('id') // Primary key
    table.boolean('allow_forward_starting') // Whether forward starting is allowed
    table.string('display_name') // Name of the market (e.g., AUD Basket)
    table.integer('display_order') // Order for display purposes
    table.boolean('exchange_is_open') // Is the exchange open
    table.boolean('is_trading_suspended') // Is trading suspended
    table.string('market') // Market (e.g., synthetic_index, forex)
    table.string('market_display_name') // Display name of the market
    table.decimal('pip', 10, 5) // Pip value with precision
    table.string('subgroup') // Subgroup (e.g., baskets)
    table.string('subgroup_display_name') // Subgroup display name
    table.string('submarket') // Submarket (e.g., minor_pairs)
    table.string('submarket_display_name') // Submarket display name
    table.string('symbol') // Symbol (e.g., WLDAUD, frxAUDCAD)
    table.string('symbol_type') // Type of symbol (e.g., forex_basket, forex)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('markets')
}
