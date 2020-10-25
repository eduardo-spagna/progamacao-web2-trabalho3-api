// Interfaces
const DefaultResponseInterface = use('App/Interfaces/DefaultResponseInterface');

// Messages
const UserMessage = use('App/Messages/UserMessage');

// Models
const User = use('App/Models/User');

// Validators
const UserValidator = use('App/Validators/UserValidator');

class UserController {
  async store({
    auth, request, response,
  }) {
    const newUser = new User();
    newUser.fill(request.all());

    const userValidation = await UserValidator
      .validationCreate(newUser.toJSON());

    if (userValidation.fails()) {
      const responseMessage = new DefaultResponseInterface({
        code: 'user/invalid-data',
        message: UserMessage.getMessage('user/invalid-data'),
        data: userValidation.messages()[0],
      });
      return response.status(400).send(responseMessage);
    }

    try {
      const { user_id, user_email } = await User.create({
        user_name: newUser.user_name,
        user_photo_url: newUser.user_photo_url,
        user_email: newUser.user_email,
        user_password: newUser.user_password,
      });

      const extraPayload = {
        user_id,
        user_email,
      };

      const user_token = await auth
        .authenticator('jwt')
        .attempt(
          newUser.user_email,
          newUser.user_password,
          extraPayload,
        );

      const responseMessage = new DefaultResponseInterface({
        code: 'user/successfully-created',
        message: UserMessage.getMessage('user/successfully-created'),
        data: { user_id, user_token },
      });
      return response.status(201).send(responseMessage);
    } catch (error) {
      console.log('Erro ao criar o usuário', error);
      const responseMessage = new DefaultResponseInterface({
        code: 'user/error-creating',
        message: UserMessage.getMessage('user/error-creating'),
        data: {},
      });
      return response.status(500).send(responseMessage);
    }
  }

  async userAuthentication({ request, response, auth }) {
    const { user_email, user_password } = request.all();

    const userAuthenticationValidation = await UserValidator
      .validationAuthentication({
        user_email, user_password,
      });

    if (userAuthenticationValidation.fails()) {
      const responseMessage = new DefaultResponseInterface({
        code: 'user/invalid-data',
        message: UserMessage.getMessage('user/invalid-data'),
        data: userAuthenticationValidation.messages()[0],
      });
      return response.status(400).send(responseMessage);
    }

    const userRecord = (await User.query()
      .where('user_email', user_email)
      .first()) || null;

    if (userRecord !== null) {
      const extraPayload = {
        user_id: userRecord.user_id,
        user_email,
      };

      try {
        const userToken = await auth
          .authenticator('jwt')
          .attempt(user_email, user_password, extraPayload);

        const responseMessage = new DefaultResponseInterface({
          code: 'user/successfully-authenticated',
          message: UserMessage.getMessage('user/successfully-authenticated'),
          data: { ...userToken },
        });
        return response.status(200).send(responseMessage);
      } catch (error) {
        if (error.message.includes('E_PASSWORD_MISMATCH')) {
          const responseMessage = new DefaultResponseInterface({
            code: 'user/incorrect-login',
            message: UserMessage.getMessage('user/incorrect-login'),
            data: {},
          });
          return response.status(400).send(responseMessage);
        }

        console.log('Erro ao tentar autenticar o usuario', error);

        const responseMessage = new DefaultResponseInterface({
          code: 'user/error-authenticating',
          message: UserMessage.getMessage('user/error-authenticating'),
          data: {},
        });
        return response.status(500).send(responseMessage);
      }
    } else {
      const responseMessage = new DefaultResponseInterface({
        code: 'user/not-found',
        message: UserMessage.getMessage('user/not-found'),
        data: {},
      });
      return response.status(404).send(responseMessage);
    }
  }
}

module.exports = UserController;
