import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import UserService from 'App/Services/UserService'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const validated = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({ trim: true }, [rules.confirmed('password_confirmation')]),
      }),
    })

    const user = await UserService.createUser({
      name: validated.name,
      email: validated.email,
      password: validated.password,
    })

    const token = await auth.use('api').login(user)

    return { ...token.toJSON(), user_id: token.user.id }
  }

  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)
    return { ...token.toJSON(), user_id: token.user.id }
  }

  public async currentUser({ auth }: HttpContextContract) {
    const { user } = auth

    return user
  }
}
