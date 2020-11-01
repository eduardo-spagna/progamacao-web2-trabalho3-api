/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Env = use('Env');

const Url = require('url-parse');

const DATABASE_URL = new Url(Env.get('DATABASE_URL'));

class DatabaseChangesSchema extends Schema {
  up() {
    // Set timezone
    this.raw(`ALTER DATABASE "${Env.get('DB_DATABASE', DATABASE_URL.pathname.substr(1))}" SET TIMEZONE TO 'Brazil/East'`);
  }

  down() { }
}

module.exports = DatabaseChangesSchema;
