import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Key from './Key'

export default class KeyLoan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public keyId: number

  @belongsTo(() => Key)
  public key: BelongsTo<typeof Key>

  @column()
  public reason: string

  @column()
  public responsibleName: string
  @column()
  public responsiblePhone: string
  @column()
  public responsibleRegister: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime
}
