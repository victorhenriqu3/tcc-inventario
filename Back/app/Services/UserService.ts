import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

interface CreateUserParams {
  name: string
  email: string
  password: string
  level: string
}

class UserService {
  public async createUser(params: CreateUserParams): Promise<User> {
    return Database.transaction(async (trx) => {
      const user = new User()

      user.useTransaction(trx)

      user.name = params.name
      user.level = params.level
      user.email = params.email
      user.password = params.password

      user.merge({
        ...params,
      })

      await user.save()

      return user
    })
  }

  public async getByLevel(levels: string[]) {
    if (!levels) {
      return await User.all()
    }
    return await User.query().whereIn('level', levels)
  }

  public async deleteUser(id: number) {
    return await User.query().where('id', id).delete()
  }
}

export default new UserService()
