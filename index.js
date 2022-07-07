const express = require('express');

const server = express();


// Query params = ?nome=NodeJs
// Route params = /curso/2
// Request Body = { nome: 'NodeJs, tipo: 'Backend' }

const cursos = ['NodeJs', 'JavaScript', 'React Native']

// listagem de apenas um curso
server.get('/cursos/:index', (req, res) =>{

  //const nome = req.query.nome;
  //return res.json({ curso: `Aprendendo ${nome}`})

  const { index } = req.params;

  return res.json(cursos[index])
})

// listagem de todos os cursos
server.get('/cursos', (req, res) =>{
  return res.json(cursos);
})



// Precisa falar pro express que a gente está mandando uma estrutura pro express
server.use(express.json());
// adicionar algum curso no array
server.post('/cursos', (req, res) =>{
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
})

// Atualizando algum curso
server.put('/cursos/:index', (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
})

// Deletando algum curso
server.delete('/cursos/:index', (req, res) =>{
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json({ message: `Curso deletado com sucesso!!!`});
})


server.listen(3000);