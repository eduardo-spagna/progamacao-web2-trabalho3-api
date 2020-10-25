const { validate } = use('Validator');
const UserMessage = use('App/Messages/UserMessage');

class UserValidator {
  static get rulesCreate() {
    const users = 'users';
    return {
      user_name: 'required|string|max:50',
      user_photo_url: 'required|url|max:1024',
      user_email: `required|string|email|max:90|unique:${users},user_email`,
      user_password: 'required|string|min:8|max:30',
    };
  }

  static get rulesAuthentication() {
    return {
      user_email: 'required|string|email',
      user_password: 'required|string|min:8|max:30',
    };
  }

  static get messagesCreate() {
    return {
      'user_name.required': UserMessage.getMessage('user/required-name'),
      'user_name.string': UserMessage.getMessage('user/data-type-string-name'),
      'user_name.max': UserMessage.getMessage('user/max-limit-name'),
      'user_photo_url.required': UserMessage.getMessage('user/required-photo-url'),
      'user_photo_url.url': UserMessage.getMessage('user/invalid-photo-url'),
      'user_photo_url.max': UserMessage.getMessage('user/max-limit-photo-url'),
      'user_email.required': UserMessage.getMessage('user/required-email'),
      'user_email.string': UserMessage.getMessage('user/data-type-string-email'),
      'user_email.email': UserMessage.getMessage('user/invalid-email'),
      'user_email.max': UserMessage.getMessage('user/max-limit-email'),
      'user_email.unique': UserMessage.getMessage('user/unique-email'),
      'user_password.required': UserMessage.getMessage('user/required-password'),
      'user_password.string': UserMessage.getMessage('user/data-type-string-password'),
      'user_password.min': UserMessage.getMessage('user/min-limit-password'),
      'user_password.max': UserMessage.getMessage('user/max-limit-password'),
    };
  }

  static get messagesAuthentication() {
    return {
      'user_email.required': UserMessage.getMessage('user/required-email'),
      'user_email.string': UserMessage.getMessage('user/data-type-string-email'),
      'user_email.email': UserMessage.getMessage('user/invalid-email'),
      'user_password.required': UserMessage.getMessage('user/required-password'),
      'user_password.string': UserMessage.getMessage('user/data-type-string-password'),
      'user_password.min': UserMessage.getMessage('user/min-limit-password'),
      'user_password.max': UserMessage.getMessage('user/max-limit-password'),
    };
  }

  static async validationCreate(data) {
    return validate(data, this.rulesCreate, this.messagesCreate);
  }

  static async validationAuthentication(data) {
    return validate(data, this.rulesAuthentication, this.messagesAuthentication);
  }
}

module.exports = UserValidator;
