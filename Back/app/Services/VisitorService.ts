import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Visitor from 'App/Models/Visitor'
import { DateTime } from 'luxon'

interface CreateVisitorParams {
  reason: string
  nature: string
  evento_id?: number
  responsiblePerson: {
    name: string
    cpf: string
    phone: string
  }
  user: User
}

interface EditVisitorParams extends CreateVisitorParams {
  visitorId: number
}

class VisitorService {
  public async create({ reason, user, nature, evento_id, responsiblePerson }: CreateVisitorParams) {
    return Database.transaction(async (trx) => {
      const visitor = new Visitor()
      visitor.useTransaction(trx)

      if (responsiblePerson.cpf.length) {
        let rawCpf = responsiblePerson.cpf.replace(/\D/g, '')
        visitor.cpf = `***.${rawCpf.slice(3, 6)}.${rawCpf.slice(6, 9)}-**`
      }

      visitor.reason = reason
      visitor.nature = nature
      visitor.event_id = evento_id
      visitor.userId = user.id
      visitor.name = responsiblePerson.name
      visitor.phone = responsiblePerson.phone
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

  public async edit({
    visitorId,
    reason,
    nature,
    evento_id,
    responsiblePerson: { name, phone, cpf },
  }: EditVisitorParams) {
    return Database.transaction(async (trx) => {
      const visitor = await Visitor.findOrFail(visitorId)

      if (cpf.length) {
        let rawCpf = cpf.replace(/[.-]/g, '')
        visitor.cpf = `***.${rawCpf.slice(3, 6)}.${rawCpf.slice(6, 9)}-**`
      }

      visitor.useTransaction(trx)
      visitor.reason = reason
      visitor.name = name
      visitor.phone = phone
      visitor.nature = nature
      visitor.event_id = evento_id

      await visitor.save()

      return visitor
    })
  }
}

export default new VisitorService()
