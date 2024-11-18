import Database from '@ioc:Adonis/Lucid/Database'
import Visitor from 'App/Models/Visitor'
import { DateTime } from 'luxon'

interface CreateVisitorParams {
  reason: string
  nature: string
  evento_id?: number
  key_id: number
  responsableUserId: number
  Person: {
    name: string
    cpf: string
    phone: string
  }
}

interface EditVisitorParams extends CreateVisitorParams {
  visitorId: number
}

class VisitorService {
  public async create({
    reason,
    responsableUserId,
    nature,
    evento_id,
    Person,
    key_id,
  }: CreateVisitorParams) {
    return Database.transaction(async (trx) => {
      const visitor = new Visitor()
      visitor.useTransaction(trx)

      if (Person.cpf.length) {
        let rawCpf = Person.cpf.replace(/\D/g, '')
        visitor.cpf = `***.${rawCpf.slice(3, 6)}.${rawCpf.slice(6, 9)}-**`
      }

      visitor.reason = reason
      visitor.nature = nature
      visitor.events_id = evento_id
      visitor.userId = responsableUserId
      visitor.name = Person.name
      visitor.keyId = key_id
      visitor.phone = Person.phone
      await visitor.save()

      await visitor.load('responsiblePerson')

      if (evento_id) await visitor.load('event')

      await visitor.load('key')

      return visitor
    })
  }

  public async update(visitorId: number) {
    return Database.transaction(async (trx) => {
      const visitor = await Visitor.findOrFail(visitorId)
      visitor.useTransaction(trx)
      visitor.updatedAt = DateTime.local()

      await visitor.save()

      await visitor.load('responsiblePerson')
      await visitor.load('event')
      await visitor.load('key')

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
    Person: { name, phone, cpf },
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
      visitor.events_id = evento_id

      await visitor.save()

      return visitor
    })
  }

  public async showAll(name?: string) {
    return await Visitor.query()
      .if(name, (query) => query.whereILike('name', `%${name}%`))
      .orderBy('created_at', 'desc')
      .preload('event')
      .preload('responsiblePerson')
      .preload('key')
  }
}

export default new VisitorService()
