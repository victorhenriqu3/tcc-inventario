import Database from '@ioc:Adonis/Lucid/Database'
import Key from 'App/Models/Key'
import KeyLoan from 'App/Models/KeyLoan'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

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

      const key = await Key.findOrFail(keyId)
      key.useTransaction(trx)
      key.is_avaible = false
      await key.save()

      await Promise.all([loan.load('user'), loan.load('key')])

      return loan
    })
  }

  public async update(loanId: number) {
    return Database.transaction(async (trx) => {
      const loan = await KeyLoan.findOrFail(loanId)
      loan.useTransaction(trx)
      loan.updatedAt = DateTime.local()

      const key = await Key.findOrFail(loan.keyId)
      key.useTransaction(trx)
      key.is_avaible = true
      await key.save()

      await Promise.all([loan.load('user'), loan.load('key')])

      return loan
    })
  }
}
export default new LoanService()