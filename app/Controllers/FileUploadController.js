// Interfaces
const DefaultResponseMessage = use('App/Interfaces/DefaultResponseMessage');

// Messages
const FileUploadMessage = use('App/Messages/FileUploadMessage');

// Utils
const FileUploadUtil = use('App/Utils/FileUploadUtil');

class FileUploadController {
  async store({ request, response }) {
    try {
      const urls = await FileUploadUtil.processFile(request);

      const responseMessage = new DefaultResponseMessage({
        code: 'upload/successfully-uploaded',
        message: FileUploadMessage.getMessage('upload/successfully-uploaded'),
        data: urls,
      });
      return response.status(200).send(responseMessage.json());
    } catch (error) {
      console.log(error);
      const responseMessage = new DefaultResponseMessage({
        code: 'upload/upload-error',
        message: FileUploadMessage.getMessage('upload/upload-error'),
        data: {},
      });
      return response.status(500).send(responseMessage);
    }
  }
}

module.exports = FileUploadController;
