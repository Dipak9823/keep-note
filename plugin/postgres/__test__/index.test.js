const Fastify = require("fastify");
const postgres = require("../index");

describe("Postgres plugin", () => {
  let fastify;
  const dbConfig = {
    DB_HOST: "test-host",
    DB_PORT: "4567",
    DB_NAME: "test-db",
    DB_USER: "test-user",
    DB_PASSWORD: "password",
    DB_MAX_CONNECTION: 20,
    DB_CONNECTION_TIMEOUT: "10000",
    DB_STATEMENT_TIMEOUT: "10000"
  };

  beforeEach(() => {
    fastify = Fastify();
  });

  afterEach(async () => {
    await fastify.close();
  });

  it("fastify.pg should exists when valid db config is passed", async () => {
    fastify.register(postgres, dbConfig);
    await fastify.ready();

    expect(fastify.pg).toBeDefined();
  });

  it("should throw error when invalid db config is passed", async () => {
    const invalidDbConfig = {
      ...dbConfig,
      DB_HOST: undefined
    };

    let error;
    try {
      fastify.register(postgres, invalidDbConfig);
      await fastify.ready();
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new Error("should have required property 'DB_HOST'"));
    expect(fastify.pg).toBeUndefined();
  });
});
