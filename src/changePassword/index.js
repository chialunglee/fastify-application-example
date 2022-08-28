const sql = require('../db');

const changePassword = async (request) => {
  const sqlResult = await sql.file(`${__dirname}/check-password.sql`, [
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

  if (request.body.newPassword1 !== request.body.newPassword2) {
    return '新密碼不一致';
  }

  await sql.file(`${__dirname}/update-password.sql`, [
    request.body.newPassword1,
    request.user.sub,
  ]);

  return '密碼修改成功';
};

module.exports = {
  changePassword,
};
