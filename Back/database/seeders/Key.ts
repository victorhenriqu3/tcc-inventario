import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Key from 'App/Models/Key'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'
    await Key.updateOrCreateMany(uniqueKey, [
      { name: 'Sala de aula 1 - Bloco A', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Sala de aula 2 - Bloco A', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Sala de aula 3 - Bloco A', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Sala de aula 4 - Bloco A', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Sala de aula 5 - Bloco A', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Sala de aula 6 - Bloco B', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Sala de aula 7 - Bloco B', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Sala de aula 8 - Bloco B', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Sala de aula 9 - Bloco B', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Sala de aula 10 - Bloco B', is_avaible: true, level: 'PROFESSOR' },
      { name: 'Auditório - Bloco A', is_avaible: true, level: 'COORDENADOR' },
    ])
  }
}
