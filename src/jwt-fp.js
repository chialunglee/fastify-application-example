const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  fastify.register(require('@fastify/jwt'), {
    secret: 'sheep',
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
