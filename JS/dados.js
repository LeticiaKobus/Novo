// Aqui dentro estão os dados de tudo o que vai ser vendido no site
const dados = {
  aneis: [
    // Array de objetos representando os anéis disponíveis para venda
    {
      id: 1,
      nome: "Anel 1",
      imagem: "a1.png",
      descricao: "Nosso anel 1",
      preco: getRandomPrice(), // Gera um preço aleatório para o anel
    },
    // Outros objetos representando diferentes anéis, cada um com suas propriedades
    {
      id: 2,
      nome: "Anel 2",
      imagem: "a2.png",
      descricao: "Nosso anel 2",
      preco: getRandomPrice(),
    },
    {
      id: 3,
      nome: "Anel 3",
      imagem: "a3.png",
      descricao: "Nosso anel 3",
      preco: getRandomPrice(),
    },
    {
      id: 4,
      nome: "Anel 4",
      imagem: "a4.png",
      descricao: "Nosso anel 4",
      preco: getRandomPrice(),
    },
    {
      id: 5,
      nome: "Anel 5",
      imagem: "a5.png",
      descricao: "Nosso anel 5",
      preco: getRandomPrice(),
    },
    {
      id: 6,
      nome: "Anel 6",
      imagem: "a6.png",
      descricao: "Nosso anel 6",
      preco: getRandomPrice(),
    },
    {
      id: 7,
      nome: "Anel 7",
      imagem: "a7.png",
      descricao: "Nosso anel 7",
      preco: getRandomPrice(),
    },
    {
      id: 8,
      nome: "Anel 8",
      imagem: "a8.png",
      descricao: "Nosso anel 8",
      preco: getRandomPrice(),
    },
  ],
  colares: [
    // Array de objetos representando os colares disponíveis para venda
    {
      id: 9,
      nome: "Colar 1",
      imagem: "c1.png",
      descricao: "Nosso colar 1",
      preco: getRandomPrice(), // Gera um preço aleatório para o colar
    },
    // Outros objetos representando diferentes colares, cada um com suas propriedades
    {
      id: 10,
      nome: "Colar 2",
      imagem: "c2.png",
      descricao: "Nosso colar 2",
      preco: getRandomPrice(),
    },
    {
      id: 11,
      nome: "Colar 3",
      imagem: "c3.png",
      descricao: "Nosso colar 3",
      preco: getRandomPrice(),
    },
    {
      id: 12,
      nome: "Colar 4",
      imagem: "c4.png",
      descricao: "Nosso colar 4",
      preco: getRandomPrice(),
    },
    {
      id: 13,
      nome: "Colar 5",
      imagem: "c5.png",
      descricao: "Nosso colar 5",
      preco: getRandomPrice(),
    },
    {
      id: 14,
      nome: "Colar 6",
      imagem: "c6.png",
      descricao: "Nosso colar 6",
      preco: getRandomPrice(),
    },
    {
      id: 15,
      nome: "Colar 7",
      imagem: "c7.png",
      descricao: "Nosso colar 7",
      preco: getRandomPrice(),
    },
    {
      id: 16,
      nome: "Colar 8",
      imagem: "c8.png",
      descricao: "Nosso colar 8",
      preco: getRandomPrice(),
    },
    {
      id: 17,
      nome: "Colar 9",
      imagem: "c9.png",
      descricao: "Nosso colar 9",
      preco: getRandomPrice(),
    },
  ],
  pulseiras: [
    // Array de objetos representando as pulseiras disponíveis para venda
    {
      id: 18,
      nome: "Pulseira 1",
      imagem: "p1.png",
      descricao: "Nosso pulseira 1",
      preco: getRandomPrice(), // Gera um preço aleatório para a pulseira
    },
    // Outros objetos representando diferentes pulseiras, cada uma com suas propriedades
    {
      id: 19,
      nome: "Pulseira 2",
      imagem: "p2.png",
      descricao: "Nosso pulseira 2",
      preco: getRandomPrice(),
    },
    {
      id: 20,
      nome: "Pulseira 3",
      imagem: "p3.png",
      descricao: "Nosso pulseira 3",
      preco: getRandomPrice(),
    },
    {
      id: 21,
      nome: "Pulseira 4",
      imagem: "p4.png",
      descricao: "Nosso pulseira 4",
      preco: getRandomPrice(),
    },
    {
      id: 22,
      nome: "Pulseira 5",
      imagem: "p5.png",
      descricao: "Nosso pulseira 5",
      preco: getRandomPrice(),
    },
    {
      id: 23,
      nome: "Pulseira 6",
      imagem: "p6.png",
      descricao: "Nosso pulseira 6",
      preco: getRandomPrice(),
    },
    {
      id: 24,
      nome: "Pulseira 7",
      imagem: "p7.png",
      descricao: "Nosso pulseira 7",
      preco: getRandomPrice(),
    },
    {
      id: 25,
      nome: "Pulseira 8",
      imagem: "p8.png",
      descricao: "Nosso pulseira 8",
      preco: getRandomPrice(),
    },
    {
      id: 26,
      nome: "Pulseira 9",
      imagem: "p9.png",
      descricao: "Nosso pulseira 9",
      preco: getRandomPrice(),
    },
  ],
};

// Função para gerar um preço aleatório entre 100 e 300
function getRandomPrice() {
  return Math.floor(Math.random() * (300 - 100 + 1)) + 100;
}

// Dados do carrinho
const dados_carrinho = {
  produtos: [], // Inicialmente o carrinho está vazio
};

// Salvar dados no localStorage localmente no navegador se ainda não existirem
if (!localStorage.getItem("produtos")) {
  // Se não houver dados de produtos no localStorage, salva os dados iniciais
  localStorage.setItem("produtos", JSON.stringify(dados));
}

if (!localStorage.getItem("carrinho")) {
  // Se não houver dados do carrinho no localStorage, salva os dados iniciais
  localStorage.setItem("carrinho", JSON.stringify(dados_carrinho));
}
