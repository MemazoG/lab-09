const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../model/post');


router.get('/', async function(req,res){
  // Obtiene todos los posts de la BD
  const posts = await Post.find();
  console.log(posts);
  // Manda todos los posts para que se carguen en index.ejs
  res.render('index', {posts});
});

//Pantalla para agregar post
router.get('/newPost', async (req,res) =>{
  // Renderiza pantalla con formulario de agregar post
  res.render('newPost');
});

// Agregar un post
router.post('/newPost', async (req, res) => {
  // Crear post con los datos del body
  const post = new Post(req.body);
  console.log(post);
  // Guardarlo en la BD
  await post.save();

  // Redirigir a HOME
  res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
  // Obtiene el ID de los parámetros y lo busca en la BD
  const id = req.params.id;
  const post = await Post.findById(id);

  // Renderiza la página edit y le manda el post
  res.render('edit.ejs', {post});
});

router.post('/edit/:id', async (req, res) => {
  // Obtiene el ID de los parámetros
  const id = req.params.id;
  // Actualiza ese registro con la nueva info
  await Post.updateOne({_id: id}, req.body);
  // Redirige a HOME
  res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
  // Obtiene el ID de los parámetros y lo busca en la BD
  const id = req.params.id;
  const post = await Post.findById(id);

  // Renderiza la página edit y le manda el post
  res.render('delete.ejs', {post});
});

router.post('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await Post.remove({_id: id});
  res.redirect("/");
})

module.exports = router;