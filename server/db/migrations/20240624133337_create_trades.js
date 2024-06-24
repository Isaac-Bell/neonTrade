export async function up(knex) {
  return knex.schema.createTable('trades', function (table) {
    table.increments('id').primary()
    table.string('date')
    table.decimal('amount')
    table.string('instrument')
    table.string('result')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('trades')
}
