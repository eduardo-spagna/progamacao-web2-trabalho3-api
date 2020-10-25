class DefaultResponseInterface {
  constructor({
    code,
    message,
    data,
  }) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  json() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}

module.exports = DefaultResponseInterface;
