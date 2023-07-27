import Database from '@ioc:Adonis/Lucid/Database'
import KeyLoan from 'App/Models/KeyLoan'
import User from 'App/Models/User'

interface CreateLoanParams {
  keyId: number
  reason: string
  responsiblePerson: {
    name: string
    register: string
    phone: string
  }
  user: User
}

class LoanService {
  public async create({
    user,
    keyId,
    reason,
    responsiblePerson,
  }: CreateLoanParams): Promise<KeyLoan> {
    return Database.transaction(async (trx) => {
      const loan = new KeyLoan()

      loan.userId = user.id
      loan.keyId = keyId
      loan.reason = reason
      loan.responsibleName = responsiblePerson.name
      loan.responsiblePhone = responsiblePerson.phone
      loan.responsibleRegister = responsiblePerson.register
      loan.useTransaction(trx)
      await loan.save()

      await Promise.all([loan.load('user'), loan.load('key')])

      return loan
    })
  }
}
export default new LoanService()
