function adicionar(evt) {
	evt.preventDefault(); //Nao deixa a tela recarregar

	let descricaoInput = document.getElementById("descricao");
	let descricao = (descricaoInput.value);

	let valorInput = document.getElementById("valor");
	let valor = (valorInput.value);

	let quantidadeInput = document.getElementById("quantidade");
	let quantidade = (quantidadeInput.value);

	//Declara um novo item e adiciona a lista de itens
	let novoItem = {
		descricao: descricao,
		valor: valor,
		quantidade: quantidade
	};
	listaDeItems.push(novoItem);

	exibirItems();
}

function removeElemento(index) {
  //Remove a barra de edição
  formularioEdicao.classList.add("invisivel");

  // Remove o elemento na posicao index
  listaDeItems.splice(index, 1);
 
  // Apos a remocao, limpa a tabela e preenche novamente
  exibirItems();
}
 
function editarElemento(index) {
  //Esconde a barra de edição
  formularioEdicao.classList.remove("invisivel");

  let item = listaDeItems[index];
  indiceDaEdicao = index;
 
  // Pega o elemento de descricao da edicao
  let descricaoInput = document.getElementById("descricao-input-edit");
 
  // Coloca o valor da descricao da tarefa atual no campo de descricao
  descricaoInput.value = item.descricao;
 
  // O mesmo para valor
  let valorInput = document.getElementById("valor-input-edit");
  valorInput.value = item.valor;
 
  // E para quantidade
  let quantidadeInput = document.getElementById("quantidade-input-edit");
  quantidadeInput.value = item.quantidade;
}

function salvarEdicao(evt) {
  // Evita atualizacao
  evt.preventDefault();

  let descricaoInput = document.getElementById("descricao-input-edit");
  let novaDescricao = descricaoInput.value;
  let valorInput = document.getElementById("valor-input-edit");
  let novoValor = (valorInput.value);
  let quantidadeInput = document.getElementById("quantidade-input-edit");
  let novaQuantidade = (quantidadeInput.value);

  let novaTarefa = {
    descricao: novaDescricao,
    valor: novoValor,
    quantidade: novaQuantidade,
  };

  //Troca do valor anterior pelo editado
  listaDeItems[indiceDaEdicao] = novaTarefa;

  //Renderiza a tabela
  exibirItems();

  //Esconde a barra de edição
  formularioEdicao.classList.add("invisivel");
}

function exibirItems(){
	let corpoDaTabela = document.getElementById("conteudo");
	
	corpoDaTabela.innerHTML = ""; //Limpa a tabela

	// Grava os elementos na memoria
 	localStorage.setItem("listaDeItems", JSON.stringify(listaDeItems));

	for (let i=0; i<listaDeItems.length; i++){ //Loop em casa elemento
		let item = listaDeItems[i];
		
		let linha = document.createElement("tr");
		corpoDaTabela.appendChild(linha);

		let posicao = document.createElement("th");
    	linha.appendChild(posicao);
    	posicao.innerText = i + 1;

		let celulaDescricao = document.createElement("td");
		celulaDescricao.innerText = item.descricao;
		linha.appendChild(celulaDescricao);

		let celulaValor = document.createElement("td");
		celulaValor.innerText = "R$ " + item.valor;
		linha.appendChild(celulaValor);

		let celulaQuantidade = document.createElement("td");
		celulaQuantidade.innerText =item.quantidade;
		linha.appendChild(celulaQuantidade);

		let total = item.valor * item.quantidade;
		let celulaTotal = document.createElement("td");
		celulaTotal.innerText = "R$ " + total.toFixed(2);
		linha.appendChild(celulaTotal);

		let acoes = document.createElement("td");
	    linha.appendChild(acoes);
	 
	    let button = document.createElement("button");
	    button.className = "btn btn-danger";
	    button.innerHTML = '<i class="fas fa-trash-alt"></i>';
	    button.onclick = function () {
	      removeElemento(i);
	    };
	    acoes.appendChild(button);
	 
	    let botaoEdicao = document.createElement("button");
	    botaoEdicao.className = "btn btn-info";
	    botaoEdicao.innerHTML = '<i class="fas fa-edit"></i>';
	    botaoEdicao.onclick = function () {
	      editarElemento(i);
	    };
	    acoes.appendChild(botaoEdicao);
	}
	exibirRodape();
}

function exibirRodape(){
	let rodape = document.getElementById("rodape");
	
	rodape.innerHTML = ""; //Limpa rodape

	let linha = document.createElement("tr");
	rodape.appendChild(linha);

	linha.appendChild(document.createElement("td")); //Adiciona celula vazia
	linha.appendChild(document.createElement("td")); //Adiciona celula vazia
	linha.appendChild(document.createElement("td")); //Adiciona celula vazia
	linha.appendChild(document.createElement("td")); //Adiciona celula vazia

	let total = 0;

	for (let i=0; i<listaDeItems.length; i++){ //Percorre toda a lista e soma os valores
		let item = listaDeItems[i];
		let valorTotalDoItem = item.valor * item.quantidade;

		total += valorTotalDoItem; //Acumula o resultado total com o valor atual
	}

	let celulaTotal = document.createElement("td");
	celulaTotal.innerText = "R$ " + total.toFixed(2);
	linha.appendChild(celulaTotal);
}

let formulario = document.getElementById("formulario");
formulario.onsubmit = adicionar;

let formularioEdicao = document.getElementById("formulario-edit");
formularioEdicao.onsubmit = salvarEdicao;
let indiceDaEdicao = null;

let botaoCancelar = document.getElementById("cancelar");
botaoCancelar.onclick = function() {
  formularioEdicao.classList.add("invisivel");
}

//const listaDeItems = [
//{descricao: 'Vassoura', valor: 2, quantidade: 5},
//{descricao: 'Pano', valor: 4, quantidade: 7},
//{descricao: 'Balde', valor: 1.99, quantidade: 9},
//];

// Lista de tarefas a fazer recuperada da memoria do navegador
let tabelaSalva = localStorage.getItem("listaDeItems");
 
// Quando utilizamos o ||, pegamos a primeira opcao, se existir, ou a segunda opcao
let listaDeItems = JSON.parse(tabelaSalva) || [];

//Renderiza a tabela
exibirItems();