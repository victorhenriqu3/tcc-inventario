import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      { name: 'Admin' },
      {
        name: 'Admin',
        email: 'victor@email.com',
        password: 'Admin@2024',
        level: 'ADMIN',
      }
    )
  }
}
