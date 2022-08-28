const sql = require('../db');

const login = async (fastify, request) => {
  const sqlResult = await sql.file(`${__dirname}/login.sql`, [
    request.body.password,
    request.body.email,
  ]);
  const isDataCorrect = (sqlResult.length > 0) ? sqlResult[0].pswmatch : false;

  const token = isDataCorrect ? fastify.jwt.sign({
    email: request.body.email,
    sub: sqlResult[0].id,
  }) : '';

  return {
    isDataCorrect,
    token,
  };
};

module.exports = {
  login,
};
