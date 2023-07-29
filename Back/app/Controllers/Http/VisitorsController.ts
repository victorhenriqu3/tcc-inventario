import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
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
}
