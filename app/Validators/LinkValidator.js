const { validate } = use('Validator');
const LinkMessage = use('App/Messages/LinkMessage');

class LinkValidator {
  static get rulesCreate() {
    return {
      link_original: 'required|url|max:1024',
    };
  }

  static get messagesCreate() {
    return {
      'link_original.required': LinkMessage.getMessage('link/required-original-url'),
      'link_original.url': LinkMessage.getMessage('link/invalid-original-url'),
      'link_original.max': LinkMessage.getMessage('link/max-limit-original-url'),
    };
  }

  static async validationCreate(data) {
    return validate(data, this.rulesCreate, this.messagesCreate);
  }
}

module.exports = LinkValidator;
