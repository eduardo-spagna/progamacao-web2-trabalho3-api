const messages = {
  'upload/successfully-uploaded': 'Upload realizado com sucesso',
  'upload/upload-error':
    'Erro ao realizar o upload do(s) arquivo(s). Formatos permitidos (.pdf, .png, .jpeg, .jpg)',
  'upload/invalid-file':
    'O formato do arquivo em base64 não é válido. Formatos permitidos (.pdf, .png, .jpeg, .jpg)',
};

class UploadFileMessage {
  static getMessage(code) {
    return messages[code];
  }
}

module.exports = UploadFileMessage;
