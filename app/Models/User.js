/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
  tokens() {
    return this.hasMany('App/Models/Token');
  }

  static get primaryKey() {
    return 'user_id';
  }

  static get table() {
    return 'users';
  }

  static get createdAtColumn() {
    return 'user_created_at';
  }

  static get updatedAtColumn() {
    return null;
  }

  static boot() {
    super.boot();
    this.addHook('beforeSave', 'UserHook.encryptPassword');
  }
}

module.exports = User;
