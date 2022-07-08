const express = require('express');

const server = express();


// Query params = ?nome=NodeJs
// Route params = /curso/2
// Request Body = { nome: 'NodeJs, tipo: 'Backend' }

const cursos = ['NodeJs', 'JavaScript', 'React Native']

// Middleware Global (utilizares o 'next' como parêmetro para continuar nossa requisição)
server.use( (req, res, next) =>{
  console.log(`Requisição chamada: ${req.url}`)

  return next();
})

// Middleware 'não global'
function checkCurso(req, res, next){
  if(!req.body.name){
    return res.status(400).json({ error: "Nome do curso é obrigatório"});
  }

  return next();
}

// Middleware
function checkIndexCurso(req, res, next){
  const curso = cursos[req.params.index];
  if(!curso){
    return res.status(400).json({ error: "O curso não existe"});
  }

  return next();
}


// listagem de apenas um curso
server.get('/cursos/:index', checkIndexCurso, (req, res) =>{

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
//1- adicionar algum curso no array //2- Utilizando o middleware 'checkCurso', conferimos se o usuário está enviando algum nome de curso, se não enviar o nome, será bloqueado pelo middleware e aparecerá uma mensagem avisando que o nome do curso é obrigatório
server.post('/cursos', checkCurso, (req, res) =>{
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
})

// Atualizando algum curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
})

// Deletando algum curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) =>{
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json({ message: `Curso deletado com sucesso!!!`});
})


server.listen(3000);