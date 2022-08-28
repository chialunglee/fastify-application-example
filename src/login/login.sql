SELECT id, (salt_plus_hash = crypt($1, salt_plus_hash)) AS pswmatch
FROM member
WHERE email = $2;
