export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('account').del();

  // Inserts seed entries
  await knex('account').insert([
    { account: 'account1', token: null, currency: 'usd' },
    { account: 'account2', token: null, usd: 'usd' },
    { account: 'account3', token: null, usd: 'usd' },
  ]);
}