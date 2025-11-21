let cardContainer = document.querySelector(".card-Container");
let campoBusca = document.querySelector("#input-busca"); // 1. Adiciona referência ao campo de busca

let dados = [];
async function iniciarBusca() {
  let resposta = await fetch("data.json");
  dados = await resposta.json();
  renderizaCards(dados);
  if (dados.length === 0) {
    try {
      let resposta = await fetch("data.json");
      dados = await resposta.json();
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      return;
    }
  }
  const termoBusca = campoBusca.value.toLowerCase(); // 2. Obtém o termo de busca em minúsculas
  const dadosFiltrados = dados.filter(
    (dado) =>
      dado.nome.toLowerCase().includes(termoBusca) || // 3. Filtra pelos campos desejados
      dado.descricao.toLowerCase().includes(termoBusca)
  );
  renderizaCards(dadosFiltrados);
}

function renderizaCards(dados) {
  cardContainer.innerHTML = ""; // 4. Limpa os cards existentes antes de renderizar os novos
  for (let dado of dados) {
    let article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
     <h2>${dado.nome}</h2>
     <p>${dado.data_criacao}</p>
     <p>${dado.descricao}.</p>
     <a
     href="${dado.link}"
     target="_blank"
     >Saiba mais</a`;
    cardContainer.appendChild(article);
  }
}

// 5. Inicia a função principal
