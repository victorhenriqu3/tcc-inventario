import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Visitor from 'App/Models/Visitor'
import VisitorService from 'App/Services/VisitorService'

export default class VisitorsController {
  public async create({ request }: HttpContextContract) {
    const validated = await request.validate({
      schema: schema.create({
        evento_id: schema.number.optional(),
        nature: schema.string(),
        Person: schema.object().members({
          name: schema.string(),
          cpf: schema.string(),
          phone: schema.string(),
        }),
        reason: schema.string(),
        responsableUserId: schema.number(),
        key_id: schema.number(),
      }),
    })

    return await VisitorService.create({ ...validated })
  }

  public async update({ request }: HttpContextContract) {
    const visitorId = request.param('visitorId')
    return await VisitorService.update(visitorId)
  }

  public async getAll({ request }: HttpContextContract) {
    const { name } = request.qs()

    return await VisitorService.showAll(name)
  }
  public async getById({ request }: HttpContextContract) {
    const visitorId = request.param('visitorId')
    return await Visitor.findOrFail(visitorId)
  }

  public async edit({ request }: HttpContextContract) {
    const visitorId = request.param('visitorId')
    const validated = await request.validate({
      schema: schema.create({
        evento_id: schema.number.optional(),
        nature: schema.string(),
        Person: schema.object().members({
          name: schema.string(),
          cpf: schema.string(),
          phone: schema.string(),
        }),
        reason: schema.string(),
        responsableUserId: schema.number(),
        key_id: schema.number(),
      }),
    })
    return await VisitorService.edit({ visitorId, ...validated })
  }

  public async delete({ request }: HttpContextContract) {
    const visitorId = request.param('visitorId')

    return await VisitorService.delete(visitorId)
  }
}
