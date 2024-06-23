import Connection from "../Connection.js";

export default async function () {
  const connection = Connection("localhost", "root", "1234", "novo");
  const query = "SELECT * FROM Products";
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
