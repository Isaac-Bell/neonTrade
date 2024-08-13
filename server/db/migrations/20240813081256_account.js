export async function up(knex) {
return knex.schema.createTable('account', (table) => {
table.integer('id').primary()
table.string('account').notNullable()
table.string('token').nullable()
table.string('currency')
})

}
export async function down(knex){
    return knex.schema.dropTable('account')
}