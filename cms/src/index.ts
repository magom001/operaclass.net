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
    console.log(error);
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
  register(/*{ strapi }*/) {},

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
  },
};
