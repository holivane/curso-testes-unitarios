import { describe, expect, jest, test } from '@jest/globals'
import Editora from '../../models/editora.js'

describe('Testa modelo Editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'Sao Paulo',
    email: 'c@c.com'
  }

  test('Instancia uma nova editora', () => {
    const editora = new Editora(objetoEditora)

    expect(editora).toEqual(expect.objectContaining(objetoEditora))
  })

  test.skip('Salva uma editora no banco de dados', () => {
    const editora = new Editora(objetoEditora)

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC')
    })
  })

  test.skip('Salva uma editora no DB, usando a sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora)

    const dados = await editora.salvar()

    const retornado = await Editora.pegarPeloId(dados.id)

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    )
  })

  test('Faz uma chamada simulada ao DB', () => {
    const editora = new Editora(objetoEditora)

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'Sao Paulo',
      email: 'c@c.com',
      created_at: '2023-03-25',
      updated_at: '2023-03-25'
    })

    const retornado = editora.salvar()

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    )
  })
})
