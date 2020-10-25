/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

// eslint-disable-next-line no-multi-assign
const UserHook = (exports = module.exports = {});

UserHook.encryptPassword = async (instance) => {
  if (instance.dirty.user_password) {
    instance.user_password = await Hash.make(
      instance.user_password,
    );
  }
};
