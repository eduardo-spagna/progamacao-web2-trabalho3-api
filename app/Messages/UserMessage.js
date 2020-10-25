const messages = {
  'user/required-name': 'O nome do usuário é obrigatório',
  'user/data-type-string-name': 'O nome do usuário deve ser uma string',
  'user/max-limit-name': 'O nome do usuário deve conter até 50 caracteres',
  'user/required-photo-url': 'A URL da foto do usuário é obrigatória',
  'user/invalid-photo-url': 'A URL da foto do usuário não é valida',
  'user/max-limit-photo-url': 'A URL da foto do usuário deve conter até 1024 caracteres',
  'user/required-email': 'O email do usuário é obrigatório',
  'user/data-type-string-email': 'O email do usuário deve ser uma string',
  'user/invalid-email': 'O email do usuário não é válido',
  'user/max-limit-email': 'O email do usuário deve conter até 90 caracteres',
  'user/required-password': 'A senha do usuário é obrigatória',
  'user/data-type-string-password': 'A senha do usuário deve ser uma string',
  'user/min-limit-password': 'A senha do usuário deve conter no mínimo 8 caracteres',
  'user/max-limit-password': 'A senha do usuário deve conter no máximo 30 caracteres',

  'user/invalid-data': 'Dados inválidos',
  'user/successfully-created': 'Usuário criado com sucesso',
  'user/error-creating': 'Ocorreu um erro interno ao tentar criar o usuário',
  'user/successfully-searched': 'Pesquisa de usuários realizada com sucesso',
  'user/error-searched': 'Erro ao realizar a pesquisa de usuários',
  'user/successfully-updated': 'Usuário atualizado com sucesso',
  'user/error-updating': 'Ocorreu um erro interno ao tentar atualizar os dados do usuário',
  'user/successfully-authenticated': 'Usuário autenticado com sucesso',
  'user/error-authenticating': 'Ocorreu um erro interno ao tentar autenticar o usuário',
  'user/not-found': 'Usuário não encontrado',
  'user/incorrect-login': 'Os dados de login informados foram digitados incorretamente',
  'user/unauthorized': 'Usuário não autorizado',
};

class UserMessage {
  static getMessage(code) {
    return messages[code];
  }
}

module.exports = UserMessage;
