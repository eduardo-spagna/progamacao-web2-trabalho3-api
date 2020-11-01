const messages = {
  'link/required-original-url': 'A URL original que será encurtada é obrigatória',
  'link/invalid-original-url': 'A URL original não é valida',
  'link/max-limit-original-url': 'A URL original deve conter até 1024 caracteres',

  'link/invalid-data': 'Dados inválidos',
  'link/successfully-created': 'Link encurtado com sucesso',
  'link/error-creating': 'Ocorreu um erro interno ao tentar encurtar o link',
  'link/successfully-searched-all-links': 'Listagem dos links encurtados realizada com sucesso',
  'link/error-searched-all-links': 'Erro ao realizar a listagem dos links encurtados',
  'link/successfully-searched-one-link': 'Link original obtido com sucesso',
  'link/error-searched-one-link': 'Erro ao obter o link original',
  'link/not-found': 'Link não encontrado',
  'link/existing-link': 'Este link já foi encurtado anteriormente',
};

class LinkMessage {
  static getMessage(code) {
    return messages[code];
  }
}

module.exports = LinkMessage;
