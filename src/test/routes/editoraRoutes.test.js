import { afterEach, describe, expect } from '@jest/globals'
import app from '../../app.js'
import request from 'supertest'

let server

beforeEach(() => {
  const port = 3030
  server = app.listen(port)
})


afterEach(() => {
  server.close()
})

describe('GET em /editoras', () => {
  test('Retorna uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200)

    expect(resposta.body[0].email).toEqual('e@e.com')
  })
})

let idRespostaPost
describe('POST em /editoras', () => {
  test('Adiciona uma nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'Sao Paulo',
        email: 's@s.com'
      })

      .expect(201)

      idRespostaPost = resposta.body.content.id
    })
  })

  describe('DELETE em /editoras', () => {
    test('Deleta o recurso adicionado', async () => {
      await request(app)
      .delete(`/editoras/${idRespostaPost}`)
      .expect(200)
    })
  })

  describe('GET em /editoras/id', () => {
    test('Retorna o recurso selecionado', async () => {
      await request(app)
      .get(`/editoras/${idRespostaPost}`)
      .expect(200)
  })
})