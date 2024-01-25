import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Visitor from 'App/Models/Visitor'
import VisitorService from 'App/Services/VisitorService'

export default class VisitorsController {
  public async create({ auth, request }: HttpContextContract) {
    const validated = await request.validate({
      schema: schema.create({
        reason: schema.string(),
        responsiblePerson: schema.object().members({
          name: schema.string(),
          cpf: schema.string(),
          phone: schema.string(),
        }),
      }),
    })

    return await VisitorService.create({ ...validated, user: auth.user! })
  }

  public async update({ request }: HttpContextContract) {
    const visitorId = request.param('visitorId')
    return await VisitorService.update(visitorId)
  }

  public async getAll({ request }: HttpContextContract) {
    const { name } = request.qs()

    return await Visitor.query()
      .if(name, (query) => query.whereILike('name', `%${name}%`))
      .orderBy('created_at', 'desc')
  }
  public async getById({ request }: HttpContextContract) {
    const visitorId = request.param('visitorId')
    return await Visitor.findOrFail(visitorId)
  }

  public async edit({ request, auth }: HttpContextContract) {
    const visitorId = request.param('visitorId')
    const validated = await request.validate({
      schema: schema.create({
        reason: schema.string(),
        responsiblePerson: schema.object().members({
          name: schema.string(),
          cpf: schema.string(),
          phone: schema.string(),
        }),
      }),
    })
    return await VisitorService.edit({ user: auth.user!, visitorId, ...validated })
  }

  public async delete({ request }: HttpContextContract) {
    const visitorId = request.param('visitorId')

    return await VisitorService.delete(visitorId)
  }
}
