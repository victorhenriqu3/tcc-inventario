import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import Key from 'App/Models/Key'

export default class KeysController {
  public async index({ auth }: HttpContextContract) {
    if (!auth.user) {
      return
    }
    return await Database.from(Key.table).where('is_avaible', true)
  }

  public async updateKey
}

