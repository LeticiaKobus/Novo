// Renderizar Produtos na Tela Carrinho, pegando o Container e os itens dentro do carrinho
const container = document.getElementById("carrinho"); // Obtém o elemento container do carrinho na página
const carrinho = JSON.parse(localStorage.getItem("carrinho")); // Obtém os dados do carrinho do localStorage

// Itera sobre cada item no carrinho e renderiza na tela
carrinho["produtos"].forEach((item) => {
  container.innerHTML += `
    <div class="item">
      <h1 class="nome">${item.nome}</h1>
      <img class="imagem" src="../IMG/${item.imagem}" alt="${item.nome}" />
      <p class="descricao">${item.descricao}</p>
      <p class="preco">R$ ${item.preco}</p>
      <p class="quantidade">Quantidade: ${item.quantidade}</p>
      <button class="comprar" onclick="removerCarrinho(${item.id})">Remover do Carrinho</button>
    </div>
  `;
});

// Função para remover itens do carrinho
function removerCarrinho(id) {
  carrinho["produtos"] = carrinho["produtos"].filter((item) => item.id !== id); // Filtra o item a ser removido do carrinho
  localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza os dados do carrinho no localStorage
  alert("Item removido do carrinho"); // Exibe mensagem de sucesso
  window.location.reload(); // Recarrega a página para refletir as mudanças
}

// Renderizar o preço total dentro do carrinho
document.getElementById("total").innerHTML =
  `Total: R$ ${carrinho["produtos"].reduce(
    (acc, item) => acc + item.preco * item.quantidade, // Calcula o preço total multiplicando o preço pelo quantidade de cada item e somando todos os valores
    0
  )}` + ",00";

// Função para finalizar a compra e ir para a tela inicial
document.getElementById("finalizar").addEventListener("click", () => {
  alert("Compra realizada com sucesso!"); // Exibe mensagem de sucesso
  carrinho["produtos"] = []; // Limpa o carrinho após a compra
  localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza os dados do carrinho no localStorage
  window.location.reload(); // Recarrega a página para refletir as mudanças
});
