import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.updateOrCreateMany('name', [
      {
        name: 'Admin',
        email: 'victor@email.com',
        password: 'Admin@2024',
        level: 'ADMIN',
      },
      {
        name: 'Ana Silva',
        email: 'ana.silva@example.com',
        password: 'senha123',
        level: 'COORDENADOR',
      },
      {
        name: 'Bruno Costa',
        email: 'bruno.costa@example.com',
        password: 'senha456',
        level: 'PROFESSOR',
      },
      {
        name: 'Julia Santos',
        email: 'julia.santos@example.com',
        password: 'Julia789',
        level: 'COORDENADOR',
      },
      {
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@example.com',
        password: 'Pedro012',
        level: 'PROFESSOR',
      },
    ])
  }
}
