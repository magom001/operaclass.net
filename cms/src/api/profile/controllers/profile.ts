/**
 * profile controller
 */

import { factories } from "@strapi/strapi";

/**
create or replace view strapi.profiles_by_type_with_videos as (
select 
	strapi.profiles.id, strapi.profiles.first_name, 
	strapi.profiles.last_name, 
  	strapi.profile_types.name, 
	strapi.profiles.locale,
    strapi.profiles.rating,
    strapi.cities.name as city,
	strapi.profile_types.code,
	jsonb_agg(u) as videos
from strapi.profiles 
left join strapi.profiles_profile_types_links on strapi.profiles.id = strapi.profiles_profile_types_links.profile_id
left join strapi.profile_types on strapi.profile_types.id = strapi.profiles_profile_types_links.profile_type_id
left join (select * from strapi.profiles_components as x where x.field = 'videos') as pc on pc.entity_id = strapi.profiles.id
left join strapi.components_pianist_you_tube_links as u on u.id = pc.component_id
left join strapi.profiles_city_links on strapi.profiles.id = strapi.profiles_city_links.profile_id
left join strapi.cities on strapi.profiles_city_links.city_id = strapi.cities.id
group by 
	strapi.profiles.id, 
	strapi.profile_types.name, 
	strapi.profile_types.code, 
	strapi.profiles.locale,
	strapi.profiles.rating,
	strapi.cities.name
)
 */
const MODEL = "api::profile.profile";
export default factories.createCoreController(MODEL, ({ strapi }) => ({
  async findBySlug(ctx) {
    await this.validateQuery(ctx);
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const { locale } = sanitizedQueryParams;
    const { slug } = ctx.params;

    const entity = await strapi.db.query(MODEL).findOne({
      where: { slug, locale },
      populate: {
        speaks: true,
        reads: true,
        phonetics: true,
        experiences: true,
        goals: true,
        contacts: true,
        recommendations: true,
        profileTypes: true,
        city: {
          populate: ["country"],
        },
        pictures: {
          populate: true,
        },
        videos: {
          populate: true,
        },
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
  async getRandom(ctx) {
    await this.validateQuery(ctx);
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const { locale, rating = 0, limit = 1 } = sanitizedQueryParams;

    const ids: { id: number }[] = await strapi.db.connection
      .withSchema(process.env.DATABASE_SCHEMA ?? "public")
      .from(strapi.getModel(MODEL).collectionName)
      .select("id")
      .orderByRaw("RANDOM()")
      .limit(limit as number)
      .where({ locale })
      .andWhere("rating", ">=", rating as number);

    const profiles = await strapi.db.query(MODEL).findMany({
      where: {
        id: ids.map(({ id }) => id),
      },
      populate: {
        profileTypes: true,
        pictures: {
          populate: true,
        },
        videos: {
          populate: true,
        },
        city: {
          populate: ["country"],
        },
      },
    });

    return profiles;
  },
}));
