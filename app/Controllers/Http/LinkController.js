// Interfaces
const DefaultResponseInterface = use('App/Interfaces/DefaultResponseInterface');

// Messages
const LinkMessage = use('App/Messages/LinkMessage');

// Models
const Link = use('App/Models/Link');

// Validators
const LinkValidator = use('App/Validators/LinkValidator');

// Others
const Env = use('Env');
const randomString = require('random-string');

class LinkController {
  async store({ auth, request, response }) {
    const { data } = auth.jwtPayload;
    const { user_id } = data;

    const newLink = new Link();
    newLink.fill(request.all());

    const linkValidation = await LinkValidator
      .validationCreate(newLink.toJSON());

    if (linkValidation.fails()) {
      const responseMessage = new DefaultResponseInterface({
        code: 'link/invalid-data',
        message: LinkMessage.getMessage('link/invalid-data'),
        data: linkValidation.messages()[0],
      });
      return response.status(400).send(responseMessage);
    }

    try {
      const findLink = await Link
        .query()
        .whereRaw('link_original LIKE ? AND user_id = ?', [newLink.link_original, +user_id])
        .first();

      if (findLink != null) {
        const responseMessage = new DefaultResponseInterface({
          code: 'link/existing-link',
          message: LinkMessage.getMessage('link/existing-link'),
          data: {
            link_id: findLink.link_id,
            link_original: findLink.link_original,
            link_shortened: findLink.link_shortened,
            link_shortened_tag: findLink.link_shortened_tag,
          },
        });
        return response.status(200).send(responseMessage);
      }

      const shortenedTag = randomString({ length: 8 });

      const link = await Link.create({
        link_original: newLink.link_original,
        link_shortened: `${Env.get('SHORTENER_URL')}/${shortenedTag}`,
        link_shortened_tag: shortenedTag,
        user_id,
      });

      const responseMessage = new DefaultResponseInterface({
        code: 'link/successfully-created',
        message: LinkMessage.getMessage('link/successfully-created'),
        data: {
          link_id: link.link_id,
          link_original: link.link_original,
          link_shortened: link.link_shortened,
          link_shortened_tag: link.link_shortened_tag,
        },
      });
      return response.status(201).send(responseMessage);
    } catch (error) {
      console.log('Erro ao encurtar o link', error);
      const responseMessage = new DefaultResponseInterface({
        code: 'link/error-creating',
        message: LinkMessage.getMessage('link/error-creating'),
        data: {},
      });
      return response.status(500).send(responseMessage);
    }
  }

  async index({ auth, response }) {
    const { data } = auth.jwtPayload;
    const { user_id } = data;

    try {
      const links = await Link
        .query()
        .setHidden(['user_id'])
        .where('user_id', user_id)
        .fetch();

      const queryLinksToJSON = links.toJSON();

      const responseMessage = new DefaultResponseInterface({
        code: 'link/successfully-searched-all-links',
        message: LinkMessage.getMessage('link/successfully-searched-all-links'),
        data: queryLinksToJSON,
      });
      return response.status(200).send(responseMessage);
    } catch (error) {
      console.log('Erro ao buscar os links do usuario', error);
      const responseMessage = new DefaultResponseInterface({
        code: 'link/error-searched-all-links',
        message: LinkMessage.getMessage('link/error-searched-all-links'),
        data: {},
      });
      return response.status(500).send(responseMessage);
    }
  }
}

module.exports = LinkController;
