import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import KeyLoan from 'App/Models/KeyLoan'
import User from 'App/Models/User'

export default class KeyLoanSeeder extends BaseSeeder {
  public async run() {
    const user = await User.firstOrFail()

    const keyLoans = [
      {
        userId: user.id,
        keyId: 1,
        reason: 'Acesso à sala de reuniões',
        responsibleName: 'Ana Clara Silva',
        responsiblePhone: '(69) 9 1234-5678',
        responsibleRegister: '7925732537853-1',
      },
      {
        userId: user.id,
        keyId: 2,
        reason: 'Manutenção de equipamentos',
        responsibleName: 'Carlos Eduardo Santos',
        responsiblePhone: '(69) 9 2345-6789',
        responsibleRegister: '7925732537853-2',
      },
      {
        userId: user.id,
        keyId: 5,
        reason: 'Entrega de materiais',
        responsibleName: 'Fernanda Rocha Lima',
        responsiblePhone: '(69) 9 3456-7890',
        responsibleRegister: '7925732537853-3',
      },
      {
        userId: user.id,
        keyId: 6,
        reason: 'Acesso ao laboratório',
        responsibleName: 'João Pedro Ferreira',
        responsiblePhone: '(69) 9 4567-8901',
        responsibleRegister: '7925732537853-4',
      },
      {
        userId: user.id,
        keyId: 10,
        reason: 'Supervisão de obra',
        responsibleName: 'Rafael Silva Pereira',
        responsiblePhone: '(69) 9 5678-9012',
        responsibleRegister: '7925732537853-5',
      },
      {
        userId: user.id,
        keyId: 11,
        reason: 'Evento de integração',
        responsibleName: 'Camila Barbosa Martins',
        responsiblePhone: '(69) 9 6789-0123',
        responsibleRegister: '7925732537853-6',
      },
      {
        userId: user.id,
        keyId: 12,
        reason: 'Atendimento técnico',
        responsibleName: 'Felipe Augusto Costa',
        responsiblePhone: '(69) 9 7890-1234',
        responsibleRegister: '7925732537853-7',
      },
    ]

    await KeyLoan.updateOrCreateMany('responsibleName', keyLoans)
  }
}
