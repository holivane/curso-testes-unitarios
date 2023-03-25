import { afterEach, describe, expect, jest } from "@jest/globals";
import app from "../../app.js";
import request from "supertest";

let server;

beforeEach(() => {
  const port = 3030;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET em /editoras", () => {
  test("Retorna uma lista de editoras", async () => {
    const resposta = await request(app)
      .get("/editoras")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual("e@e.com");
  });
});

describe("GET em /editoras/id", () => {
  test("Retorna o recurso selecionado", async () => {
    await request(app).get(`/editoras/${idRespostaPost}`).expect(200);
  });
});

let idRespostaPost;
describe("POST em /editoras", () => {
  test("Adiciona uma nova editora", async () => {
    const resposta = await request(app)
      .post("/editoras")
      .send({
        nome: "CDC",
        cidade: "Sao Paulo",
        email: "s@s.com",
      })
      .expect(201);

    idRespostaPost = resposta.body.content.id;
  });

  test("Não adiciona se o body estiver vazio", async () => {
    await request(app).post("/editoras").send({}).expect(400);
  });
});

describe("PUT em /editoras/id", () => {
  test.each([
    ["nome", { nome: "Casa do codigo" }],
    ["cidade", { cidade: "SP" }],
    ["email", { email: "c@c.com" }],
  ])("Altera o campo %s", async (chave, params) => {

    const requisicao = {request}
    const spy = jest.spyOn(requisicao, 'request')
    await requisicao.request(app)
      .put(`/editoras/${idRespostaPost}`)
      .send(params)
      .expect(204);

    expect(spy).toHaveBeenCalled()
  });
});

describe("DELETE em /editoras/id", () => {
  test("Deleta o recurso adicionado", async () => {
    await request(app).delete(`/editoras/${idRespostaPost}`).expect(200);
  });
});
