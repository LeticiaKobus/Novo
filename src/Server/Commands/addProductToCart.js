import Connection from "../Connection.js";

export default (userID, productID) => {
  const connection = Connection("localhost", "root", "1234", "novo");
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO Usercart (ProductID, UserID) VALUES (?, ?)",
      [productID, userID],
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
};
