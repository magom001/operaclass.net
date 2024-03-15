/**
 * pianist controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::pianist.pianist",
  ({ strapi }) => ({
    async findBySlug(ctx) {
      await this.validateQuery(ctx);
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const { locale } = sanitizedQueryParams;
      const { slug } = ctx.params;

      const entity = await strapi.db.query("api::pianist.pianist").findOne({
        where: { slug, locale },
        populate: true,
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
