export async function up(knex) {
  return knex.schema.alterTable('trades', (table) => {
    table.dropColumn('id') // Drop the existing primary key column
    table.string('trade_id').primary() // Add the new primary key column
    table.timestamp('timestamp')
    table.string('type')
    table.integer('quantity')
    table.float('price')
    table.string('status')
    // Retain the existing columns
    table.string('date').alter()
    table.decimal('amount').alter()
    table.string('instrument').alter()
    table.string('result').alter()
  })
}

export async function down(knex) {
  return knex.schema.alterTable('trades', (table) => {
    table.increments('id').primary() // Add the original primary key column back
    table.dropColumn('trade_id')
    table.dropColumn('timestamp')
    table.dropColumn('type')
    table.dropColumn('quantity')
    table.dropColumn('price')
    table.dropColumn('status')
  })
}
