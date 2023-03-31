"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  // Create event with linked user

  async create(ctx) {
    const user = ctx.state.user;

    const posts = await super.create(ctx);

    const data = await strapi.entityService.update(
      "api::post.post",
      posts.data.id,
      {
        data: {
          user: user.id,
        },
      }
    );

    const sanitizedEvents = await this.sanitizeOutput(data, ctx);

    return this.transformResponse(sanitizedEvents);
  },

  // Update user post

  async update(ctx) {
    const user = ctx.state.user;

    ctx.query.filters = {
      ...(ctx.query.filters || {}),
      owner: user.id,
    };

    return super.update(ctx);
    // const sanitizedEvents = await this.sanitizeOutput(data, ctx);

    // return this.transformResponse(sanitizedEvents);
  },

  // Delete a user event

  async delete(ctx) {
    const { id } = ctx.params;

    const [posts] = await strapi.services.posts.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!posts) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const entity = await strapi.services.posts.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.posts });
  },

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.db.query("api::post.post").findOne({
      where: { slug },
      populate: {
        image: {
          fields: ["*"],
        },
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity);

    return this.transformResponse(sanitizedEntity);
  },

  async me(ctx) {
    console.log(ctx.state.user);

    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const data = await strapi.entityService.findMany("api::post.post", {
      populate: "image",
      filters: {
        user: {
          id: user.id,
        },
      },
    });
    if (!data) {
      return ctx.notFound();
    }

    const sanitizedEvents = await this.sanitizeOutput(data, ctx);

    return this.transformResponse(sanitizedEvents);
  },
}));
