import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Events from 'App/Models/Events'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'
    await Events.updateOrCreateMany(uniqueKey, [
      {
        name: 'VII Congresso Amazônico EAD - IFRO',
        description: 'VII Congresso Amazônico de Educação a Distância do IFRO',
      },
      {
        name: 'PS Professor Substituto - IFRO',
        description: 'Processo Seletivo para Professor Substituto - IFRO',
      },
      {
        name: 'Capacitação Primeiros Socorros - IFRO',
        description: 'Capacitação Primeiros Socorros - IFRO',
      },
    ])
  }
}
