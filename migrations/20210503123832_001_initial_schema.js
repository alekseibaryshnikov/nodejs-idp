
exports.up = function (knex) {
  await knex.raw(
    `CREATE TABLE user_credentials (
      login varchar(255) NOT NULL,
      "password" varchar(512) NOT NULL,
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      CONSTRAINT credentials_pkey PRIMARY KEY (id),
      CONSTRAINT id UNIQUE (id))`);
  
  await knex.raw(`
    CREATE TABLE settings (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" varchar(255) NULL,
      value jsonb NULL,
      "type" varchar(255) NULL,
      CONSTRAINT settings_pkey PRIMARY KEY (id))`);

  await knex.raw(`CREATE UNIQUE INDEX name ON settings USING btree (name varchar_ops)`);

  await knex.raw(`
    CREATE TABLE user_info (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" varchar NULL,
      surname varchar NULL,
      patronymic varchar NULL,
      email varchar NULL,
      "mobilePhone" int8 NULL,
      "credentialsId" uuid NOT NULL,
      "blocked" bool NULL,
      CONSTRAINT userinfo_pkey PRIMARY KEY (id))`);

  await knex.raw(`
    CREATE TABLE tokens (
      id uuid NOT NULL DEFAULT uuid_generate_v1(),
      token jsonb NOT NULL,
      code character varying(100) NOT NULL,
      CONSTRAINT tokens_pkey PRIMARY KEY (id))`);
};

exports.down = function (knex) {
  await knex.raw(`DROP TABLE tokens`);

  await knex.raw(`DROP TABLE user_info`);

  await knex.raw(`DROP TABLE settings`);
  
  await knex.raw(`DROP TABLE user_credentials`);
};
