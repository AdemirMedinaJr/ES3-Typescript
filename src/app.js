/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from "express";
import cors from "cors";
import { uuid } from "uuidv4";

const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

let products = [
  {
    code: 12,
    description: "Placa de vídeo ZT-650",
    buyPrice: 40.0,
    sellPrice: 80.0,
    tags: ["tecnologia", "computador", "gamer"],
  },
  {
    code: 99,
    description: "Macbook Pro Retina 2020",
    buyPrice: 4000.0,
    sellPrice: 6000.0,
    tags: ["tecnologia", "macbook", "apple", "macOS"],
  },
];


//TODO: listagem de todos os produtos
app.get("/products", (request, response) => response.status(200).json(products)) 


// --OK-- O status code de um produto criado deverá ser 201
// TODO: Salvar produto no array products
app.post("/products", (request, response) => {
  const product = request.body;
  products.push(product);
  response.status(201).json(product);
  // console.log(request.body)
});


// TODO: Atualiza produto por code
// --OK-- Não deve ser possível atualizar um produto inexistente
app.put("/products/:id", (request, response) => {
  const id = request.params.id;
  const description = request.body.description;
  
  let product = products.find((value) => value.id === id);
  if (product == undefined) {
    response.status(400).send();
  } else {
    product.description = description;
    response.status(200).json(product);
  }
});


// TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam o code do parâmetro
app.post("/products/:code/love", (request, response) => {
});


// TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
// --OK-- Deve retornar o código 204 quando um produto for removido
// --OK-- Deve ser possível remover os produtos pelo código
// --OK-- Não deve ser possível remover um produto inexistente
app.delete("/products/:code", (request, response) => {
  const code = request.params.code;
  const index = products.findIndex((value) => value.code == code);
  if (index == -1) {
    response.status(400).send();
  } else {
    products.splice(index, 1);
    response.status(204).send();
  }
  
  products = products.filter((value) => value.code != code);
  
  response.json(products);
});


// TODO: Busca de todos os produtos com o código recebido por parâmetro.
// --OK-- Deve ser possível buscar produtos por código no array
app.get("/products/:code", (request, response) => {
  const product = products.filter((value) => value.code == request.params.code);
  response.json(product);
  /*
  const {code} = request.params.code
  const product = products.find(value => value.code == code);
  if (client == undefined) {
    response.status(400).send()
  } else {
    response.status(200).json(product);
  }
  */
});

export default app;

/* test("deve ser possível listar todos os produtos", async () => {
  const responseSave = await request(app).post("/products").send(products[0]);
  const response = await request(app).get("/products");
  expect(response.body).toEqual(
    expect.arrayContaining([
      {
        id: responseSave.body.id,
        ...products[0],
        lovers: 0,
      },
    ])
  );
});*/