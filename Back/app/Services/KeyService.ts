import Database from '@ioc:Adonis/Lucid/Database'
import Key from 'App/Models/Key'
import { DateTime } from 'luxon'

class KeyService {
  public async create({ level = 'basic', name = '' }: Partial<Key>) {
    return Database.transaction(async (trx) => {
      const key = new Key()

      key.useTransaction(trx)
      key.level = level
      key.name = name
      key.createdAt = DateTime.local()
      key.is_avaible = true

      await key.save()
      return key
    })
  }
}

export default new KeyService()
