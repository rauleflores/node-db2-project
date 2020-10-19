exports.up = async function (knex) {
  await knex.schema.alterTable("cars", (table) => {
    table.text("transmission");
    table.text("titleStatus");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("cars", (table) => {
    table.dropColumn("transmission");
    table.dropColumn("titleStatus");
  });
};
