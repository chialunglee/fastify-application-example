const fs = require('fs');

const { OAuth2Client } = require('google-auth-library');
const { fileNotExistHandle } = require('../fileNotExistHandle');
const { hasOwnProp } = require('../hasOwnProp');

const CLIENT_ID = '551733468421-4aepernqstc4lvolvra69b92onbmn59j.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  console.log(payload);
  // const userid = payload['sub'];
  const targetFilePath = `${__dirname}/../../../temp_data/users/userlist.json`;
  fileNotExistHandle(targetFilePath, {
    users: [],
  });

  const oldUserData = JSON.parse(fs.readFileSync(targetFilePath, 'utf8'));

  const isEmailExist = oldUserData.users.some((userData) => userData.email === payload.email);

  if (isEmailExist) {
    // 不用新增帳號
    // 但有可能先前官方註冊過
    // 要做其他處理
  } else {
    oldUserData.users.push({
      email: payload.email,
      // password: request.body.password,
      iss: payload.iss,
      sub: payload.sub,
      name: payload.name,
    });
    fs.writeFileSync(targetFilePath, JSON.stringify(oldUserData, null, 2));
  }
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

const signInWithGoogle = async (request, reply) => {
  const csrf_token_cookie = request.cookies.g_csrf_token;
  if (!hasOwnProp(request.cookies, 'g_csrf_token')) {
    reply.code(400);

    return 'No CSRF token in Cookie.';
  }

  const csrf_token_body = request.body.g_csrf_token;
  if (!hasOwnProp(request.body, 'g_csrf_token')) {
    reply.code(400);

    return 'No CSRF token in post body.';
  }

  if (csrf_token_cookie !== csrf_token_body) {
    reply.code(400);

    return 'Failed to verify double submit cookie.';
  }

  try {
    await verify(request.body.credential);
  } catch (e) {
    console.error(e);
  }

  return {
    body: request.body,
    cookies: request.cookies,
  };
};

module.exports = {
  signInWithGoogle,
};
