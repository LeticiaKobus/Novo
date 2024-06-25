// Pegar dados dos Produtos no Banco de Dados
function getProdutos() {
  fetch("/products")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        data.products.forEach((product) => {
          const blob = new Blob([new Uint8Array(product.ProductImage.data)], {
            type: "image/png",
          });
          const imageUrl = URL.createObjectURL(blob);

          const createProductElement = (containerId) => {
            const container = document.getElementById(containerId);
            const productElement = document.createElement("div");
            productElement.classList.add("item");
            productElement.id = product.ProductID;
            productElement.innerHTML = `
              <h1 class="nome">${product.ProductName}</h1>
              <img class="imagem" src="${imageUrl}" alt="${product.ProductName}" />
              <p class="descricao">${product.Description}</p>
              <p class="preco">R$ ${product.Price}</p>
              <form class="form" id="visualizar">
                  <button class="botao" type="submit">Visualizar Produto</button>
              </form>
              <form class="form" id="carrinho">
                  <button class="carrinho" type="button" onclick="adicionarCarrinho(${product.ProductID})">Adicionar ao Carrinho</button>
              </form>
            `;
            container.appendChild(productElement);
          };

          switch (product.ProductType) {
            case "Combo":
              createProductElement("combos");
              break;
            case "Anel":
              createProductElement("aneis");
              break;
            case "Colar":
              createProductElement("colares");
              break;
            case "Pulseira":
              createProductElement("pulseiras");
              break;
          }
        });
      } else {
        console.log(data.message);
      }

      const prevButtons = document.querySelectorAll(".buttons.left");
      const nextButtons = document.querySelectorAll(".buttons.right");

      prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const currentSection = button.parentNode;
          const cards = currentSection.querySelector(".cards");
          const items = cards.querySelectorAll(".item");

          const firstItem = items[0];
          if (firstItem.classList.contains("item")) {
            cards.insertBefore(items[items.length - 1], firstItem);
          } else {
            cards.append(items[0]);
          }
        });
      });

      nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const currentSection = button.parentNode;
          const cards = currentSection.querySelector(".cards");
          const items = cards.querySelectorAll(".item");

          const lastItem = items[items.length - 1];
          if (lastItem.classList.contains("item")) {
            cards.append(items[0]);
          } else {
            cards.insertBefore(items[0], null);
          }
        });
      });
    });
}

getProdutos();

function adicionarCarrinho(id) {
  fetch("/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ProductID: id }),
    credentials: "include", // Inclui cookies na requisição
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Adicionado ao carrinho com sucesso!");
      } else {
        console.error("Erro ao adicionar produto ao carrinho:", data.message);
      }
    })
    .catch((error) =>
      console.error("Erro na requisição para adicionar ao carrinho:", error)
    );
}
