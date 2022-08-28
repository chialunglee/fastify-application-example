const sql = require('../db');

const createUser = async (request) => {
  let isSuccess = false;
  let errorReason = '';

  try {
    const resultArray = await sql.file(`${__dirname}/create-user.sql`, [
      request.body.email,
      request.body.password,
    ]);

    if (resultArray.count === 1) {
      isSuccess = true;
    } else {
      errorReason = `resultArray.count === ${resultArray.count}`;
    }
  } catch (err) {
    // 資料庫有 UNIQUE constraint
    if (err.message === 'duplicate key value violates unique constraint "member_email_key"') {
      // Email 重複
      errorReason = 'Email 重複';
    } else {
      errorReason = err.message;
    }
  }

  return {
    isSuccess,
    errorReason,
  };
};

module.exports = {
  createUser,
};
