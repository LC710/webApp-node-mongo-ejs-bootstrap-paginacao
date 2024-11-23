var express = require('express');
var router = express.Router();
const db = require("../models/userModel");
const service = require("../services/user")


/* GET Ir para Página de Cadastro */
router.get("/new", (req, res, next) => {
  res.render("new", {title: "Novo Cadastro", user: {"name": "", "age": ""}, action: "/new"});
});

/*  Route for SAVE New User  */

router.post('/new', async (req, res, next) => {

  const newUser = req.body;
  const name = req.body.name;
  const age = parseInt(req.body.age); 
  
  try{
    console.log(newUser)
    console.log({name, age})
    console.log({name: name, age: age});
    
    // Usando o ".insertOne()" NÃO FUNCIONOU, acho que ele não funciona usando o "mongoose", só funciona com o "mongo" sem usar o "mongoose" na documentação do "mongoose" estava o ".create()";
    // const result = await db.User.insertOne(newUser);
    // const result = await db.User.insertOne({name: name, age: age}); 
    
    
    // Usando o ".create()" FUNCIONOU 
    const result = await db.User.create({name: name, age: age});
    // const result = await db.User.create({name, age});
    // const result = await db.User.create(newUser);
    
    console.log(result);
    
    if (result) {
      res.redirect('/');
    } else {
      res.status(500).send('Erro ao inserir usuário no banco de dados');
    }
    
    
  }catch(err){
    console.log(err);
    next(err);
  }
  
});

/* GET Ir para Página de Cadastro */
router.get("/new", (req, res, next) => {
  res.render("new", {title: "Novo Cadastro", user: {"name": "", "age": ""}, action: "/new"});
});

/* GET Ir para Página de Cadastro, mas aqui vamos usar para EDITAR (Quando Clicar no Link no Nome da Pessoa vai passar o "_id" dela)*/
router.get("/edit/:id", async (req, res, next) => {
  const id = req.params.id;
  try{
    
    const user = await db.User.findOne({_id: id});
    console.log(user);
    res.render("new", {title: "Edição de Cliente", user: user, action: "/edit/" + user._id});
    // res.render("new", {title: "Novo Cadastro", user, action: "/new"}); // Poderia ser Assim;
  }catch(err){
    console.log(err);
    next(err);
  }
});

/* POST para atualizar EDITAR quando enviar o formulário */
router.post('/edit/:id', async (req, res, next) => {

  const id = req.params.id;
  const name = req.body.name;
  const age = req.body.age;

  const user = req.body;

  console.log(user);

  
  try{
     
    const result = await db.User.updateOne({_id: id}, {name: name, age: age});
    // const result = await db.User.updateOne({_id: id}, {name, age}); // Poderia ser Assim também;
    // const result = await db.User.updateOne({_id: id}, user); // Poderia ser Assim também;
    console.log(result);
    
    res.redirect("/");

  }catch(err){
    console.log(err);
    next(err);
  }

});

router.get("/delete/:id", async ( req, res, next ) => {
  const id = req.params.id;
  
  try{
    const result = await db.User.deleteOne({_id: id});
    console.log(result);
    res.redirect("/");

  }catch(err){
    console.log(err);
    next(err);
  }
})

/* GET home page. */
// Pediu para deixar essa ROTA por último
router.get('/:pagina?', async function(req, res, next) {

  const paginaAtual = parseInt(req.params.pagina || 1); // Página Atual
  
  try{
    const users = await service.findAll(paginaAtual);
    // const users = await db.User.find({});

    const countUsers = await db.User.countDocuments(); // Quantidade de registros/users/documentos; 
    const qtdPaginas = Math.ceil(countUsers / service.TAMANHO_PAGINA); // Para decobrir o número de página dívida a quantidade de registro pelo tamanho que vc quer que cada pagina tenha e depois arredonde o resultado pra cima com "Math.ceil()"" e então terá o número de páginas , exemplo vc quer que uma página tenha tenha 5 registros/usuários/cliente e vc tem registragrado 11 resgistro/usuário/cliente então (11/5) vai ser igual a 2,1 arredondando para pra cima com "Math.ceil(2,1)" virá 3 que é a quantidade de páginas vai ter "DUAS" com 5 registros e "UMA" com 1 registro;     
    
    // console.log(users)
    res.render('index', { title: 'Express', users: users, countUsers, qtdPaginas, paginaAtual });
    
  }catch(err){
    console.log(err);
    next(err);
  }
});


module.exports = router;
