import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Key from 'App/Models/Key'

export default class KeysController {
  public async index({ auth }: HttpContextContract) {
    if (!auth.user) {
      return
    }
    return await Key.all()
  }
}
