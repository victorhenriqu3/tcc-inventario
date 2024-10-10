import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Events from 'App/Models/Events'

export default class EventsController {
  public async index({ auth }: HttpContextContract) {
    if (!auth.user) {
      return
    }
    return await Database.from(Events.table).orderBy('created_at', 'desc')
  }
}
