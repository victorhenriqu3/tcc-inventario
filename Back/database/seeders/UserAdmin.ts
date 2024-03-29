import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      { name: 'Admin' },
      {
        name: 'Admin',
        email: 'victor@outlook.com',
        password: 'Admin@2023',
      }
    )
  }
}
