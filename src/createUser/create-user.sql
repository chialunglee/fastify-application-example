INSERT INTO member (name, email, salt_plus_hash)
VALUES ($1, $1, crypt($2, gen_salt('bf')));
