const { ServiceProvider } = require('@adonisjs/fold');

class CustomValidationProvider extends ServiceProvider {
  async customValidatorExists(data, field, message, args, get) {
    const Database = use('Database');
    const value = get(data, field);
    if (!value) {
      return;
    }

    const [table, column] = args;
    const total = await Database.from(table)
      .where(column, value)
      .getCount();

    if (parseInt(total, 10) === 0) {
      throw message;
    }
  }

  async customValidatorUnique(data, field, message, args, get) {
    const Database = use('Database');
    let ignoreId = null;
    const fields = args[1].split('/');
    const table = args[0];
    if (args[2]) {
      // eslint-disable-next-line prefer-destructuring
      ignoreId = args[2];
    }

    const rows = await Database.table(table).where((builder) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const f of fields) {
        builder.where(f, '=', get(data, f));
      }
      if (ignoreId) {
        builder.whereNot('id', '=', ignoreId);
      }
    }).count('* as total');

    if (rows[0].total > 0) {
      throw message;
    }
  }

  boot() {
    const Validator = use('Validator');

    Validator.extend('exists', this.customValidatorExists, 'Field doesnt exist');
    Validator.extend('unique', this.customValidatorUnique, 'Must be unique');
  }
}

module.exports = CustomValidationProvider;
