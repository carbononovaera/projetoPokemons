const quantidadePokemons = 1000;
const pokemonsPorPagina = 10; // Quantidade de pokémons por página
const cores = ['cor1', 'cor2', 'cor3', 'cor4', 'cor5']; // Cores disponíveis para os cards
let paginaAtual = 1;

const getRandomColorClass = () => {
  const randomIndex = Math.floor(Math.random() * cores.length);
  return cores[randomIndex];
};

const getPokemons = async (pagina) => {
  const offset = (pagina - 1) * pokemonsPorPagina;
  const limit = pokemonsPorPagina;
  
  for (let poke = offset + 1; poke <= offset + limit; poke++) {
    if (poke > quantidadePokemons) {
      break; // Sai do loop se já passou do número total de pokémons
    }
    try {
      await fetchPokemon(poke);
    } catch (error) {
      console.error(`Erro ao buscar Pokémon com ID ${poke}:`, error);
    }
  }
};

const fetchPokemon = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Falha na requisição');
  }
  const data = await response.json();
  displayPokemon(data);
};

const displayPokemon = (pokemon) => {
  const imagens = document.querySelector(".imagens");
  const card = document.createElement("div");
  const cardLink = document.createElement("a");
  cardLink.href = `detalhes.html?id=${pokemon.id}`; // Link para a página de detalhes com o ID do Pokémon
  cardLink.classList.add("card", getRandomColorClass()); // Adiciona uma classe de cor aleatória ao link
  card.innerHTML = `
    <div class="circulo">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    </div>
    <p class="nome">${pokemon.name}</p>
    <p class="nome">${pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
    <p class="nome">${pokemon.id}</p>
  `;
  cardLink.appendChild(card);
  imagens.appendChild(cardLink);
};

const carregarPagina = async (pagina) => {
  paginaAtual = pagina;
  const imagens = document.querySelector(".imagens");
  imagens.innerHTML = ''; // Limpa o conteúdo atual
  
  await getPokemons(pagina);
};

// Inicializa a página com a primeira página de pokémons
carregarPagina(paginaAtual);

// Adiciona um event listener para o botão de próxima página
const btnProximaPagina = document.getElementById('btnProximaPagina');
btnProximaPagina.addEventListener('click', () => {
  paginaAtual++;
  carregarPagina(paginaAtual);
});

// Adiciona um event listener para o botão de página anterior
const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    carregarPagina(paginaAtual);
  }
});
