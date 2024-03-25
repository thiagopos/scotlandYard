const express = require('express');
const app = express();
const port = 3000;

// Configurando o EJS como mecanismo de visualização
app.set('view engine', 'ejs');

// Middleware para processar dados JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para renderizar o formulário de criação de nó
app.get('/', (req, res) => {
    res.render('index', {successMessage: ""});
});

// Estrutura de dados para armazenar o grafo
let graph = {};

// Função para adicionar uma conexão entre nós ao grafo
function addConnection(node1, node2, connectionType) {
  if (!graph[node1]) {
      graph[node1] = {};
  }
  if (!graph[node1][connectionType]) {
      graph[node1][connectionType] = [];
  }
  graph[node1][connectionType].push(node2);
}

app.post('/', (req, res) => {
    // Lógica para processar os dados do formulário e construir o grafo
    const { nodeValue, connectionType, connectedNode } = req.body;
    addConnection(nodeValue, connectedNode, connectionType);    

    console.log(JSON.stringify(graph, null, 2))
    // Por enquanto, apenas envie uma resposta de confirmação
    res.render('index', {successMessage: "Nó adicionado"});
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

