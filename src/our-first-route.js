const { createUser } = require('./createUser');
const { login } = require('./login');
const { changePassword } = require('./changePassword');
const { deleteAccount } = require('./deleteAccount');
const { signInWithGoogle } = require('./signInWithGoogle');

const { getUserData } = require('./getUserData');
const { updateMember } = require('./updateMember');

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.get('/', async (request, reply) => ({ hello: 'world' }));

  fastify.post('/create-user', async (request, reply) => await createUser(request));

  fastify.post('/login', async (request, reply) => await login(fastify, request));

  fastify.get('/my-data', {
    onRequest: [fastify.authenticate],
  }, async (request, reply) => await getUserData(request));

  fastify.post('/update-member', {
    onRequest: [fastify.authenticate],
  }, async (request, reply) => await updateMember(request));

  fastify.post('/change-password', {
    onRequest: [fastify.authenticate],
  }, async (request, reply) => await changePassword(request));

  fastify.post('/delete-account', {
    onRequest: [fastify.authenticate],
  }, async (request, reply) => await deleteAccount(request));

  fastify.post('/sign-in-with-google', async (request, reply) => await signInWithGoogle(request, reply));
}

module.exports = routes;
