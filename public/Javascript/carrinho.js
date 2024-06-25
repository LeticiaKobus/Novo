// Pegar os dados do Carrinho no Banco de Dados
function getCarrinho() {
  fetch("/cart")
    .then((response) => response.json())
    .then((data) => {
      if (!data.success || !Array.isArray(data.products)) {
        console.error("data.products não é um array:", data.products);
        return;
      }

      const carrinho = document.getElementById("carrinho");

      if (data.products.length === 0) {
        carrinho.innerHTML = "<p>Seu carrinho está vazio!</p>";
        return;
      } else {
        carrinho.innerHTML = "";
        data.products.forEach((product) => {
          const blob = new Blob([new Uint8Array(product.ProductImage.data)], {
            type: "image/png",
          });
          const imageUrl = URL.createObjectURL(blob);
          const item = document.createElement("div");
          item.classList.add("item");
          item.innerHTML = `
            <h1 class="nome">${product.ProductName}</h1>
            <img class="imagem" src="${imageUrl}" alt="${product.ProductName}" />
            <p class="descricao">${product.Description}</p>
            <p class="preco">R$ ${product.Price}</p>
            <p class="quantidade">Quantidade: ${product.Stock}</p>
            <button class="remover" onclick="removerCarrinho(${product.ProductID})">Remover do Carrinho</button>
          `;
          carrinho.appendChild(item);
        });
      }
    })
    .catch((error) =>
      console.error("Erro ao buscar os dados do carrinho:", error)
    );
}

// Remover um item do carrinho
function removerCarrinho(id) {
  fetch("/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ProductID: id }),
    credentials: "include", // Inclui cookies na requisição
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Item removido do carrinho com sucesso!");
        getCarrinho();
      }
    });
}

getCarrinho();
