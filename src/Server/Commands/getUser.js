import Connection from "../Connection.js";

export default async function (username) {
  const connection = Connection("localhost", "root", "1234", "novo");
  const query = "SELECT * FROM Users WHERE Username = ?";
  return new Promise((resolve, reject) => {
    connection.query(query, [username], (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(results[0]);
    });
  });
}
