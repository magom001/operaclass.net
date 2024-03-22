import { Knex } from "knex";

async function createProfilesView(knex: Knex) {
  console.log("Creating profiles view");

  const schema = process.env.DATABASE_SCHEMA ?? "public";
  try {
    await knex.raw(
      `DROP VIEW IF EXISTS ${schema}.profiles_by_type_with_videos`
    );

    await knex.raw(`
create or replace view ${schema}.profiles_by_type_with_videos as (
select 
	${schema}.profiles.id, ${schema}.profiles.first_name, 
	${schema}.profiles.last_name, 
  ${schema}.profile_types.name, 
	${schema}.profiles.locale,
  ${schema}.profiles.rating,
  ${schema}.profiles.sex,
  ${schema}.cities.name as city,
	${schema}.profile_types.code,
	${schema}.profiles.slug,
	jsonb_agg(u) as videos
from ${schema}.profiles 
left join ${schema}.profiles_profile_types_links on ${schema}.profiles.id = ${schema}.profiles_profile_types_links.profile_id
left join ${schema}.profile_types on ${schema}.profile_types.id = ${schema}.profiles_profile_types_links.profile_type_id
left join (select * from ${schema}.profiles_components as x where x.field = 'videos') as pc on pc.entity_id = ${schema}.profiles.id
left join ${schema}.components_pianist_you_tube_links as u on u.id = pc.component_id
left join ${schema}.profiles_city_links on ${schema}.profiles.id = ${schema}.profiles_city_links.profile_id
left join ${schema}.cities on ${schema}.profiles_city_links.city_id = ${schema}.cities.id
group by 
	${schema}.profiles.id, 
	${schema}.profile_types.name, 
	${schema}.profile_types.code, 
	${schema}.profiles.locale,
	${schema}.profiles.rating,
	${schema}.cities.name,
  ${schema}.profiles.slug,
  ${schema}.profiles.sex
)`);
  } catch (error) {
    console.error(error);
  }
}

async function addUniqueIndex(
  knex,
  tableName: string,
  columnNames: string[],
  indexName: string
) {
  console.log(`Adding index ${indexName} to ${tableName} on ${columnNames}`);
  try {
    await knex.schema
      .withSchema(process.env.DATABASE_SCHEMA ?? "public")
      .alterTable(tableName, (table) => {
        table.index(columnNames, indexName);
      });
  } catch (error) {
    if (error.code !== "42P07") {
      console.log(error);
    }
  }

  console.log(
    `Adding unique constraint ${indexName} to ${tableName} on ${columnNames}`
  );
  try {
    await knex.schema
      .withSchema(process.env.DATABASE_SCHEMA ?? "public")
      .alterTable(tableName, (table) => {
        table.unique(columnNames, {
          indexName: `${indexName}_unique_constraint`,
        });
      });
  } catch (error) {
    if (error.code !== "42P07") {
      console.log(error);
    }
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ ${schema} }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const knex = strapi.db.connection;
    await addUniqueIndex(
      knex,
      "pianists",
      ["slug", "locale"],
      "pianists_slug_locale_unique"
    );
    await addUniqueIndex(
      knex,
      "profiles",
      ["slug", "locale"],
      "profiles_slug_locale_unique"
    );

    await createProfilesView(knex);
  },
};
