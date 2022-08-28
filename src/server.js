// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/cookie'), {
  // secret: "my-secret", // for cookies signature
  // parseOptions: {},     // options for parsing cookies
});

// fastify.register(require('@fastify/jwt'), {
//   secret: 'sheep',
// });
// fastify.register(require('./jwt-fp'));
fastify.register(require('@fastify/jwt'), {
  secret: 'sheep',
});

fastify.register(require('@fastify/formbody'));

fastify.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

fastify.register(require('./our-first-route'));

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
