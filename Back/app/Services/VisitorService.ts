import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Visitor from 'App/Models/Visitor'
import { DateTime } from 'luxon'

interface CreateVisitorParams {
  reason: string
  responsiblePerson: {
    name: string
    cpf: string
    phone: string
  }
  user: User
}

class VisitorService {
  public async create({ reason, user, responsiblePerson }: CreateVisitorParams) {
    return Database.transaction(async (trx) => {
      const visitor = new Visitor()
      visitor.useTransaction(trx)

      visitor.reason = reason
      visitor.userId = user.id
      visitor.name = responsiblePerson.name
      visitor.phone = responsiblePerson.phone
      visitor.cpf = responsiblePerson.cpf
      await visitor.save()

      await visitor.load('user')

      return visitor
    })
  }

  public async update(visitorId: number) {
    return Database.transaction(async (trx) => {
      const visitor = await Visitor.findOrFail(visitorId)
      visitor.useTransaction(trx)
      visitor.updatedAt = DateTime.local()

      await visitor.save()

      await visitor.load('user')

      return visitor
    })
  }

  public async delete(visitorId: number) {
    return await Database.transaction(async (trx) => {
      const keyloan = await Visitor.query()
        .useTransaction(trx)
        .where({ id: visitorId })
        .firstOrFail()

      await keyloan.delete()
    })
  }
}

export default new VisitorService()
