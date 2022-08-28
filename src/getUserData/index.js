const sql = require('../db');

const getUserData = async (request) => {
  const result = await sql.file(`${__dirname}/get-user-data.sql`, [
    request.user.sub,
  ]);

  return (result.length > 0) ? result[0] : {
    error: '使用者不存在',
  };
};

module.exports = {
  getUserData,
};
