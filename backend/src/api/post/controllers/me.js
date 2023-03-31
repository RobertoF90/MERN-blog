// const { sanitizeEntity } = require("strapi-utils");

// ("use strict");

// /**
//  * post controller
//  */

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = {
//   // Create event with linked user

//   async create(ctx) {
//     console.log(ctx.state.user);
//     let entity;
//     if (ctx.is("multipart")) {
//       const { data, files } = parseMultipartData(ctx);
//       data.user = ctx.state.user.id;
//       entity = await strapi.services.posts.create(data, { files });
//     } else {
//       ctx.request.body.user = ctx.state.user.id;
//       entity = await strapi.services.posts.create(ctx.request.body);
//     }
//     return sanitizeEntity(entity, { model: strapi.models.posts });
//   },

//   // Update user post

//   async update(ctx) {
//     console.log(ctx.state.user);

//     const { id } = ctx.params;

//     let entity;

//     const [posts] = await strapi.services.posts.find({
//       id: ctx.params.id,
//       "user.id": ctx.state.user.id,
//     });

//     if (!posts) {
//       return ctx.unauthorized(`You can't update this entry`);
//     }

//     if (ctx.is("multipart")) {
//       const { data, files } = parseMultipartData(ctx);
//       entity = await strapi.services.posts.update({ id }, data, {
//         files,
//       });
//     } else {
//       entity = await strapi.services.posts.update({ id }, ctx.request.body);
//     }

//     return sanitizeEntity(entity, { model: strapi.models.posts });
//   },

//   // Delete a user event

//   async delete(ctx) {
//     const { id } = ctx.params;

//     const [posts] = await strapi.services.posts.find({
//       id: ctx.params.id,
//       "user.id": ctx.state.user.id,
//     });

//     if (!posts) {
//       return ctx.unauthorized(`You can't update this entry`);
//     }

//     const entity = await strapi.services.posts.delete({ id });
//     return sanitizeEntity(entity, { model: strapi.models.posts });
//   },

//   async me(ctx) {
//     const user = ctx.state.user;

//     if (!user) {
//       return ctx.badRequest(null, [
//         { messages: [{ id: "No authorization header was fund" }] },
//       ]);
//     }

//     const data = await strapi.services.post.find({ user: user });

//     if (!data) {
//       return ctx.notFound();
//     }

//     return sanitizeEntity(data, { model: strapi.models.posts });
//   },
// };
