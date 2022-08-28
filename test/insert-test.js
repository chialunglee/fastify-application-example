const postgres = require('postgres');

const sql = postgres({ /* options */ }); // will use psql environment variables

sql.file(`${__dirname}/../backend/fastify/createUser/create-user.sql`, [
  'userD@example.com',
  'password',
]).then((resultArray) => {
  console.log('-------------------------------');
  console.log(resultArray);
  console.log('-------------------------------');
}).catch((error) => {
  console.log('===============================');
  console.error(error);
  console.error(error.query);
  console.error(error.parameters);
  console.error(error.message);
  console.error(error.name);
  console.log('===============================');
});
