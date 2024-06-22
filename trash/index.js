// Pegar dados dos Produtos e do Carrinho no "Banco de Dados"
const produtos = JSON.parse(localStorage.getItem("produtos")); // Obtém os dados dos produtos armazenados no localStorage
const carrinho = JSON.parse(localStorage.getItem("carrinho")); // Obtém os dados do carrinho armazenados no localStorage

// Renderizar Produtos na Tela
function renderProdutos(tipo) {
  // Obtém o elemento HTML pelo ID correspondente ao tipo de produto
  const container = document.getElementById(tipo);

  // Verifica se os produtos do tipo especificado estão presentes no carrinho
  produtos[tipo].forEach((item, index) => {
    let isInCarrinho = false;
    carrinho["produtos"].forEach((carrinhoItem) => {
      if (carrinhoItem.id === item.id) {
        isInCarrinho = true; // Define como verdadeiro se o produto estiver no carrinho
      }
    });

    // Renderiza os itens na tela
    container.innerHTML += `
    <div class="item">
      <h1 class="nome">${item.nome}</h1>
      <img class="imagem" src="../IMG/${item.imagem}" alt="${item.nome}" />
      <p class="descricao">${item.descricao}</p>
      <p class="preco">R$ ${item.preco}</p>
      <button class="botao">Comprar</button>
      <button class="comprar" onclick="${
        isInCarrinho
          ? "removerCarrinho(" + item.id + ")"
          : "adicionarCarrinho('" + tipo + "', " + index + ")"
      }">${
      isInCarrinho ? "Remover do Carrinho" : "Adicionar ao Carrinho"
    }</button>
    </div>
    `;
  });
}

// Adicionar itens ao carrinho e atualizar o localStorage
function adicionarCarrinho(tipo, index) {
  const quantidade = parseInt(window.prompt("Qual a quantidade desejada?")); // Solicita a quantidade desejada ao usuário
  if (quantidade > 0) {
    produtos[tipo][index]["quantidade"] = quantidade; // Define a quantidade selecionada para o produto
    carrinho["produtos"].push(produtos[tipo][index]); // Adiciona o produto ao carrinho
    localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza os dados do carrinho no localStorage
    alert("Item adicionado ao carrinho"); // Exibe mensagem de sucesso
    window.location.reload(); // Recarrega a página para refletir as mudanças
  } else {
    alert("Por favor, insira uma quantidade válida."); // Exibe mensagem de erro se a quantidade for inválida
  }
}

// Remover itens do carrinho e atualizar o localStorage
function removerCarrinho(id) {
  carrinho["produtos"] = carrinho["produtos"].filter((item) => item.id !== id); // Remove o item com o ID especificado do carrinho
  localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza os dados do carrinho no localStorage
  alert("Item removido do carrinho"); // Exibe mensagem de sucesso
  window.location.reload(); // Recarrega a página para refletir as mudanças
}

// Renderizar os produtos de cada tipo na tela
renderProdutos("aneis");
renderProdutos("colares");
renderProdutos("pulseiras");

// Carrossel de imagens
const prevButtons = document.querySelectorAll(".buttons.left"); // Seleciona todos os botões de navegação para a esquerda
const nextButtons = document.querySelectorAll(".buttons.right"); // Seleciona todos os botões de navegação para a direita

// Funcionalidade do botão esquerdo
prevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentSection = button.parentNode; // Obtém a seção atual do botão clicado
    const card = currentSection.querySelector(".card"); // Obtém o cartão de produtos dentro da seção
    const items = card.querySelectorAll(".item"); // Obtém todos os itens dentro do cartão

    const firstItem = items[0]; // Obtém o primeiro item
    if (firstItem.classList.contains("item")) {
      card.insertBefore(items[items.length - 1], firstItem); // Move o último item para a posição antes do primeiro
    } else {
      card.append(items[0]); // Move o item de espaço reservado para a posição final
    }
  });
});

// Funcionalidade do botão direito
nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentSection = button.parentNode; // Obtém a seção atual do botão clicado
    const card = currentSection.querySelector(".card"); // Obtém o cartão de produtos dentro da seção
    const items = card.querySelectorAll(".item"); // Obtém todos os itens dentro do cartão

    const lastItem = items[items.length - 1]; // Obtém o último item
    if (lastItem.classList.contains("item")) {
      card.append(items[0]); // Move o primeiro item para a posição final
    } else {
      card.insertBefore(items[0], null); // Move o item de espaço reservado para a posição final
    }
  });
});
