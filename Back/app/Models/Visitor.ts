import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Events from './Events'

export default class Visitor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public reason: string

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public cpf: string

  @column()
  public nature: string

  @column()
  public eventId?: number

  @belongsTo(() => Events)
  public event: BelongsTo<typeof Events>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public updatedAt: DateTime
}
