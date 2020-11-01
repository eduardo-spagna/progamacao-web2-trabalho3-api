/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Link extends Model {
  static get primaryKey() {
    return 'link_id';
  }

  static get table() {
    return 'links';
  }

  static get createdAtColumn() {
    return 'link_created_at';
  }

  static get updatedAtColumn() {
    return null;
  }
}

module.exports = Link;
