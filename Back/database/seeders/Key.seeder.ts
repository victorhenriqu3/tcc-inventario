import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Key from 'App/Models/Key'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'
    await Key.updateOrCreateMany(uniqueKey, [
      {
        name: 'Sala de aula 1',
        is_avaible: true,
        level: 'PROFESSOR',
        bloco: 'A',
        piso: 'TERREO',
        numero: '1',
      },
      {
        name: 'Sala de aula 2',
        is_avaible: true,
        level: 'TEA',
        bloco: 'A',
        piso: 'SUPERIOR',
        numero: '2',
      },
      {
        name: 'Sala de aula 3',
        is_avaible: true,
        level: 'ADMIN',
        bloco: 'B',
        piso: 'TERREO',
        numero: '3',
      },
      {
        name: 'Sala de aula 4',
        is_avaible: true,
        level: 'COORDENADOR',
        bloco: 'B',
        piso: 'SUPERIOR',
        numero: '4',
      },
      {
        name: 'Sala de aula 5',
        is_avaible: true,
        level: 'PROFESSOR',
        bloco: 'C',
        piso: 'TERREO',
        numero: '5',
      },
      {
        name: 'Sala de aula 6',
        is_avaible: true,
        level: 'TEA',
        bloco: 'C',
        piso: 'SUPERIOR',
        numero: '6',
      },
      {
        name: 'Sala de aula 7',
        is_avaible: true,
        level: 'ADMIN',
        bloco: 'A',
        piso: 'TERREO',
        numero: '7',
      },
      {
        name: 'Sala de aula 8',
        is_avaible: true,
        level: 'COORDENADOR',
        bloco: 'A',
        piso: 'SUPERIOR',
        numero: '8',
      },
      {
        name: 'Sala de aula 9',
        is_avaible: true,
        level: 'PROFESSOR',
        bloco: 'B',
        piso: 'TERREO',
        numero: '9',
      },
      {
        name: 'Sala de aula 10',
        is_avaible: true,
        level: 'TEA',
        bloco: 'B',
        piso: 'SUPERIOR',
        numero: '10',
      },
      {
        name: 'Sala de aula 11',
        is_avaible: true,
        level: 'ADMIN',
        bloco: 'C',
        piso: 'TERREO',
        numero: '11',
      },
      {
        name: 'Sala de aula 12',
        is_avaible: true,
        level: 'COORDENADOR',
        bloco: 'C',
        piso: 'SUPERIOR',
        numero: '12',
      },
    ])
  }
}
