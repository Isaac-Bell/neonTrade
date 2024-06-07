export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('fruit').del()

  // Inserts seed entries
  await knex('fruit').insert([
    { id: 1, name: 'banana' },
    { id: 2, name: 'apple' },
    { id: 3, name: 'feijoa' },
  ])
}
