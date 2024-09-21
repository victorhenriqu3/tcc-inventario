import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

import Key from 'App/Models/Key'
import KeyService from 'App/Services/KeyService'

export default class KeysController {
  public async index({ auth }: HttpContextContract) {
    if (!auth.user) {
      return
    }
    return await Database.from(Key.table).where('is_avaible', true)
  }

  public async showAll({ auth }: HttpContextContract) {
    if (!auth.user) {
      return
    }
    return await Key.query().orderBy('created_at', 'desc')
  }

  public async create({ auth, request }: HttpContextContract) {
    if (!auth.user) {
      return
    }

    const validated = await request.validate({
      schema: schema.create({
        level: schema.string(),
        name: schema.string(),
      }),
    })

    return await KeyService.create({ ...validated })
  }
}
