import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Events from 'App/Models/Events'
import Key from 'App/Models/Key'
import User from 'App/Models/User'
import Visitor from 'App/Models/Visitor'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'
    const user = await User.firstOrFail()
    const users = await User.all()
    const anotherUser = users[3]
    const event = await Events.first()
    const key = await Key.first()
    const keys = await Key.all()
    const anotherKey = keys[4]

    const usedPhones = new Set<string>()
    const usedCpfs = new Set<string>()

    const generateUniquePhone = () => {
      let phone: string
      do {
        phone = `(69) 9 ${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`
      } while (usedPhones.has(phone))
      usedPhones.add(phone)
      return phone
    }

    const generateUniqueCpf = () => {
      let cpf: string
      do {
        const base = Math.floor(100000000 + Math.random() * 900000000).toString()
        cpf = `***.${base.slice(0, 3)}.${base.slice(3, 6)}-**`
      } while (usedCpfs.has(cpf))
      usedCpfs.add(cpf)
      return cpf
    }

    await Visitor.updateOrCreateMany(uniqueKey, [
      {
        userId: user.id,
        reason: 'Reunião com o gestor',
        name: 'João da Silva',
        phone: generateUniquePhone(),
        cpf: generateUniqueCpf(),
        nature: 'Evento',
        events_id: event?.id,
        keyId: key?.id,
      },
      {
        userId: user.id,
        reason: 'Entrega de documentos',
        name: 'Maria Oliveira',
        phone: generateUniquePhone(),
        cpf: generateUniqueCpf(),
        nature: 'Evento',
        events_id: event?.id,
        keyId: key?.id,
      },
      {
        userId: anotherUser.id,
        reason: 'Reunião com o gestor',
        name: 'Pedro Souza',
        phone: generateUniquePhone(),
        cpf: generateUniqueCpf(),
        nature: 'VisitaPessoal',
        keyId: anotherKey?.id,
      },
    ])
  }
}
