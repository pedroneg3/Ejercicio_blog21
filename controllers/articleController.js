const Articles = require("../models/Article");
const Users = require("../models/User");
const Comments = require("../models/Comment");
const sequelize = require("sequelize");
// Display a listing of the resource.
async function index(req, res) {
  const articles = await Articles.findAll();
  console.log(articles);
  res.render("articleAdmin", {
    articles,
  });
}

Articles.belongsTo(Users, { notNull: true, foreignKey: { allowNull: false }});

// Display the specified resource.
async function show(req, res) {
  const id = req.params.id;
  const articles = await Articles.findByPk(id, {include: Users});

  console.log(articles)
  res.render("aboutUs", {
    articles,
  });
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("articleCreate");
}

// Store a newly created resource in storage.
async function store(req, res) {
  res.send("Soy el post de create");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const idParams = req.params.id;
  const articles = await Articles.findByPk(idParams);
  res.render("articleEdit", {
    idParams,
    articles,
  });
}

// Update the specified resource in storage.
async function update(req, res) {
  const idParams = req.params.id;
  const newArticle = req.body;
  console.log(newArticle);
  await Articles.upsert({
    id: `${idParams}`,
    title: `${newArticle.title}`, //valores ingresados en campos de texto
    content: `${newArticle.content}`,
    //image: `${newArticle.image}`,
  });

  return res.redirect("/articulos");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const idParams = req.params.id;
  await Articles.destroy({
    where: { id: `${idParams}` },
  });

  return res.redirect("/articulos");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
