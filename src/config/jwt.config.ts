const { JWT_SECRET = 'my-secret', REFRESH_SECRET = 'refresh-secret' } =
  process.env;

export { JWT_SECRET, REFRESH_SECRET };
