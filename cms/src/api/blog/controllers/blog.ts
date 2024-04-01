/**
 * blog controller
 */

import { factories } from "@strapi/strapi";

const MODEL = "api::blog.blog";

export default factories.createCoreController(
  "api::blog.blog",
  ({ strapi }) => ({
    async findBySlug(ctx) {
      await this.validateQuery(ctx);
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const { locale } = sanitizedQueryParams;
      const { slug } = ctx.params;

      const entity = await strapi.db.query(MODEL).findOne({
        where: { slug, locale },
        populate: {
          content: {
            populate: true,
          },
        },
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
