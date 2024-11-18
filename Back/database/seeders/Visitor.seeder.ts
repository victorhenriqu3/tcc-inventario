import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Events from 'App/Models/Events'
import Key from 'App/Models/Key'
import User from 'App/Models/User'
import Visitor from 'App/Models/Visitor'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'
    const user = await User.firstOrFail()
    const event = await Events.first()
    const key = await Key.first()

    await Visitor.updateOrCreateMany(uniqueKey, [
      {
        userId: user.id,
        reason: 'Reunião com o gestor',
        name: 'João da Silva',
        phone: '123456789',
        cpf: '123.456.789-00',
        nature: 'Evento',
        events_id: event?.id,
        keyId: key?.id,
      },
      {
        userId: user.id,
        reason: 'Entrega de documentos',
        name: 'Maria Oliveira',
        phone: '987654321',
        cpf: '987.654.321-00',
        nature: 'Evento',
        events_id: event?.id,
        keyId: key?.id,
      },
    ])
    // Write your database queries inside the run method
  }
}
