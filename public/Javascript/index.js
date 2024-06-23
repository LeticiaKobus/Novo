// Pegar dados dos Produtos no "Banco de Dados"
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

          if (product.ProductType === "Anel") {
            const aneis = document.getElementById("aneis");
            const anel = document.createElement("div");
            anel.classList.add("item");
            anel.id = product.ProductID;
            anel.innerHTML = `
              <h1 class="nome">${product.ProductName}</h1>
              <img class="imagem" src="${imageUrl}" alt="${product.ProductName}" />
              <p class="descricao">${product.Description}</p>
              <p class="preco">R$ ${product.Price}</p>
              <form class="form" id="${product.ProductID}">
                  <button class="botao" type="submit">Visualizar Produto</button>
              </form>
              <form class="form" id="${product.ProductID}">
                  <button class="carrinho" type="submit" onclick="adicionarCarrinho(${product.Stock}, ${product.ProductID})">Adicionar ao Carrinho</button>
              </form>
            `;
            aneis.appendChild(anel);
          } else if (product.ProductType === "Colar") {
            const colares = document.getElementById("colares");
            const colar = document.createElement("div");
            colar.classList.add("item");
            colar.id = product.ProductID;
            colar.innerHTML = `
              <h1 class="nome">${product.ProductName}</h1>
              <img class="imagem" src="${imageUrl}" alt="${product.ProductName}" />
              <p class="descricao">${product.Description}</p>
              <p class="preco">R$ ${product.Price}</p>
              <form class="form" id="${product.ProductID}">
                  <button class="botao" type="submit">Visualizar Produto</button>
              </form>
              <form class="form" id="${product.ProductID}">
                  <button class="carrinho" type="submit" onclick="adicionarCarrinho(${product.Stock}, ${product.ProductID})">Adicionar ao Carrinho</button>
              </form>
            `;
            colares.appendChild(colar);
          } else if (product.ProductType === "Pulseira") {
            const pulseiras = document.getElementById("pulseiras");
            const pulseira = document.createElement("div");
            pulseira.classList.add("item");
            pulseira.id = product.ProductID;
            pulseira.innerHTML = `
              <h1 class="nome">${product.ProductName}</h1>
              <img class="imagem" src="${imageUrl}" alt="${product.ProductName}" />
              <p class="descricao">${product.Description}</p>
              <p class="preco">R$ ${product.Price}</p>
              <form class="form" id="${product.ProductID}">
                  <button class="botao" type="submit">Visualizar Produto</button>
              </form>
              <form class="form" id="${product.ProductID}">
                  <button class="carrinho" type="submit" onclick="adicionarCarrinho(${product.Stock}, ${product.ProductID})">Adicionar ao Carrinho</button>
              </form>
            `;
            pulseiras.appendChild(pulseira);
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
