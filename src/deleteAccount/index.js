const sql = require('../db');

const deleteAccount = async (request) => {
  const sqlResult = await sql.file(`${__dirname}/../changePassword/check-password.sql`, [
    request.body.oldPassword,
    request.user.sub,
  ]);
  const isDataCorrect = (sqlResult.length > 0) ? sqlResult[0].pswmatch : false;

  if (sqlResult.length === 0) {
    // 帳號不存在
    return '帳號不存在';
  }

  // 先比對舊密碼是否正確
  if (!isDataCorrect) {
    return '舊密碼不正確';
  }

  await sql.file(`${__dirname}/delete-account.sql`, [
    request.user.sub,
  ]);

  return '帳號刪除成功';
};

module.exports = {
  deleteAccount,
};
