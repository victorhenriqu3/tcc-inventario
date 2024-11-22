import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateKeysTable extends BaseSchema {
  protected tableName = 'keys'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name').unique().notNullable().alter()
      table.string(`bloco`).notNullable()
      table.string(`piso`).notNullable()
      table.string(`numero`).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
