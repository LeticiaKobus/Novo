// Configuração do botão de logout
const logout = document.getElementById("logout");
logout.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch("/logout", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Logout feito!");
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    });
});

// Função para obter o valor de um cookie pelo nome
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
}

// Função para decodificar o token JWT e obter informações
function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// Função para formatar o tempo restante em HH:MM:SS
function formatTimeRemaining(expirationTime) {
  const now = new Date();
  const diffInSeconds = (expirationTime - now) / 1000; // Diferença em segundos

  let minutes = Math.floor((diffInSeconds % 3600) / 60);
  let seconds = Math.floor(diffInSeconds % 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes < 0 || seconds < 0) {
    return "00:00";
  }

  return `${minutes}:${seconds}`;
}

// Função para atualizar dinamicamente o tempo restante do token em HH:MM:SS e fazer o logout automaticamente ao expirar o token
setInterval(() => {
  const token = getCookie("token");
  if (token) {
    const decodedToken = decodeToken(token);
    const expirationTime = new Date(decodedToken.exp * 1000);

    if (expirationTime < new Date()) {
      fetch("/logout", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Logout feito!");
            window.location.href = "/";
          } else {
            alert(data.message);
          }
        });
    } else {
      const timeRemaining = formatTimeRemaining(expirationTime);
      document.getElementById("userInfo").innerHTML = `
          <h3>${timeRemaining}</h3>
        `;
    }
  }
}, 1000);

// Pegar os dados do Usuário no "Banco de Dados"
function getUser() {
  const token = getCookie("token");
  if (token) {
    const decodedToken = decodeToken(token);
    const userId = decodedToken.userId;

    fetch(`/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const imageUser = data.user.UserImage;
          const userImg = document.getElementById("userImg");

          const blob = new Blob([new Uint8Array(imageUser.data)], {
            type: "image/png",
          });

          const imageUrl = URL.createObjectURL(blob);

          userImg.src = imageUrl;
        }
      });
  }
}

getUser();
