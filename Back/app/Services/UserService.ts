import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

interface CreateUserParams {
  name: string
  email: string
  password: string
}

class UserService {
  public async createUser(params: CreateUserParams): Promise<User> {
    return Database.transaction(async (trx) => {
      const user = new User()

      user.useTransaction(trx)

      user.name = params.name
      user.email = params.email
      user.password = params.password

      user.merge({
        ...params,
      })

      await user.save()

      return user
    })
  }
}

export default new UserService()
