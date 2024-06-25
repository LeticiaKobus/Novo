import Connection from "../Connection.js";

export default async function (userID) {
  const connection = Connection("localhost", "root", "1234", "novo");
  const query = `SELECT * FROM Products WHERE ProductID IN (SELECT ProductID FROM Usercart WHERE UserID = ?)`;
  return new Promise((resolve, reject) => {
    connection.query(query, [userID], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results || []);
    });
  });
}
