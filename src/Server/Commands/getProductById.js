import Connection from "../Connection.js";

export default async function (id) {
  const connection = Connection("localhost", "root", "1234", "novo");
  const query = `SELECT * FROM Products WHERE ProductID = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results[0]);
    });
  });
}
