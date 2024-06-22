import Connection from "../Connection.js";

export default async function (
  profilePhoto,
  fullname,
  email,
  birthday,
  telephone,
  username,
  password
) {
  const connection = Connection("localhost", "root", "1234", "novo");
  const query =
    "INSERT INTO Users (UserImage, FullName, Email, DateOfBirth, Phone, Username, PasswordHash) VALUES (?, ?, ?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [profilePhoto, fullname, email, birthday, telephone, username, password],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });
}
