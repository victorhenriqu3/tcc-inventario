import Database from '@ioc:Adonis/Lucid/Database'
import { getPiso } from 'App/Enums/KeyEnum'
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

  public async update({ id: keyId, name, level }: Pick<Key, 'id' | 'name' | 'level'>) {
    return await Database.transaction(async (trx) => {
      const key = await Key.findOrFail(keyId)

      key.useTransaction(trx)
      key.name = name
      key.level = level
      await key.save()
      return key
    })
  }

  public async getAllWithNames(): Promise<Key[]> {
    const keys: Key[] = await Database.from(Key.table).orderBy('created_at', 'desc')
    const keysFormatted = keys.map(({ name, bloco, piso, ...rest }: Key) => ({
      name: `${name} - Bloco ${bloco} - ${getPiso(piso)}`,
      bloco,
      piso,
      ...rest,
    }))
    return keysFormatted
  }
}

export default new KeyService()
