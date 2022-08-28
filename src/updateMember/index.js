const sql = require('../db');

const updateMember = async (request) => {
  let isSuccess = false;
  let errorReason = '';

  try {
    const resultArray = await sql.file(`${__dirname}/update-member.sql`, [
      request.body.name,
      request.body.email,
      request.user.sub,
    ]);

    if (resultArray.count === 1) {
      isSuccess = true;
    } else if (resultArray.count === 0) {
      errorReason = '帳號不存在';
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
  updateMember,
};
