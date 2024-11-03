import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'visitors'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('nature').notNullable()
      table.integer('events_id').unsigned().references('id').inTable('events').onDelete('CASCADE')
      table.integer('key_id').unsigned().references('id').inTable('keys').onDelete('CASCADE')
    })
  }
}
