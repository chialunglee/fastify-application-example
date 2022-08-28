UPDATE member
SET salt_plus_hash = crypt($1, gen_salt('bf'))
WHERE id = $2;
