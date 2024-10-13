import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Events from 'App/Models/Events'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class EventsController {
  public async index({ auth }: HttpContextContract) {
    if (!auth.user) {
      return
    }
    return await Database.from(Events.table).orderBy('created_at', 'desc')
  }

  public async create({ request }: HttpContextContract) {
    const validated = await request.validate({
      schema: schema.create({
        name: schema.string(),
        description: schema.string(),
      }),
    })
    return await Events.create({ ...validated })
  }
}
