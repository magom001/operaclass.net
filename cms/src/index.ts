export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    //   try {
    //     const knex = strapi.db.connection;
    //     await knex.schema
    //       .withSchema(process.env.DATABASE_SCHEMA ?? "public")
    //       .alterTable("pianists", (table) => {
    //         table.index(["slug", "locale"], "pianists_slug_locale_index");
    //       });
    //     await knex.schema
    //       .withSchema(process.env.DATABASE_SCHEMA ?? "public")
    //       .alterTable("pianists", (table) => {
    //         table.unique(["slug", "locale"], {
    //           indexName: "pianists_slug_locale_unique",
    //         });
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
  },
};
