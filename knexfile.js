module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "dpg-chm6ut2k728ntjenn940-a.singapore-postgres.render.com",
      port: "5432",
      database: "restaurant_info",
      user: "user",
      password: "9awBzXu6TVEOdDkeMqFGFdJ6vQ6qNz5P",
    //   connectionString: dbConnection,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
