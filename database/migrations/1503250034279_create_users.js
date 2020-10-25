/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments('user_id');
      table.string('user_name', 50).notNullable();
      table.string('user_photo_url', 1024).notNullable();
      table.string('user_email', 90).notNullable().unique();
      table.string('user_password', 200).notNullable();
      table.timestamp('user_created_at').defaultTo(this.fn.now()).notNullable();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
