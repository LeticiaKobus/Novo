import { createConnection } from "mysql2";

export default (host, user, password, database) => {
  return createConnection({
    host,
    user,
    password,
    database,
  });
};
