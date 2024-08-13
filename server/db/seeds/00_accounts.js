export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('account').del();

  // Inserts seed entries
  await knex('account').insert([
    { account: 'cr799393', token: null, currency: 'usd' },
    { account: 'vrtc1859315', token: null, currency: 'usd' },
    { account: 'cr79939381', token: null, currency: 'usd' },
  ]);
}