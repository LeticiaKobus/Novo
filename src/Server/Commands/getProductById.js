import Connection from "../Connection.js";

export default async function (id) {
  const connection = Connection("localhost", "root", "1234", "novo");
  const query = `SELECT * FROM Products WHERE ProductID = ${id}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}
