const { sanitizeEntity } = require("strapi-utils");

("use strict");

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = {
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was fund" }] },
      ]);
    }

    const data = await strapi.services.post.find({ user: user });

    if (!data) {
      return ctx.notFound();
    }

    return sanitizeEntity(data, { model: strapi.models.posts });
  },
};
