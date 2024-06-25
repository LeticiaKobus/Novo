import Connection from "../Connection.js";

export default async function (userID, productID) {
  const connection = Connection("localhost", "root", "1234", "novo");
  const query = `DELETE FROM Usercart WHERE UserID = ? AND ProductID = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [userID, productID], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}
