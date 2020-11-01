/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LinksSchema extends Schema {
  up() {
    this.create('links', (table) => {
      table.increments('link_id');
      table.string('link_original', 1024).notNullable();
      table.string('link_shortened', 1024).notNullable();
      table.string('link_shortened_tag', 20).notNullable().unique();
      table.timestamp('link_created_at').defaultTo(this.fn.now()).notNullable();
      table.integer('user_id')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE');
    });
  }

  down() {
    this.drop('links');
  }
}

module.exports = LinksSchema;
