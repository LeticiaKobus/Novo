function Acessar() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  console.log(
    JSON.stringify({
      email: email,
      password: password,
    })
  );

  fetch("login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: { "content-type": "application/json" },
  });
}
