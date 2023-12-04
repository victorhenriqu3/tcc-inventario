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

interface UpdateLoanParams extends CreateLoanParams {
  loanId: number
  isAvaible: boolean
}

interface LoanFilter {
  key?: number
  startDateTime?: string
  finalDateTime?: string
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

  public async update({ loanId, isAvaible, responsiblePerson, reason, keyId }: UpdateLoanParams) {
    return Database.transaction(async (trx) => {
      const loan = await KeyLoan.findOrFail(loanId)
      loan.useTransaction(trx)
      loan.updatedAt = DateTime.local()
      loan.keyId = keyId
      loan.reason = reason
      loan.responsibleName = responsiblePerson.name
      loan.responsiblePhone = responsiblePerson.phone
      loan.responsibleRegister = responsiblePerson.register
      if (isAvaible) {
        loan.updatedAt = DateTime.local()
      }

      await loan.save()

      const key = await Key.findOrFail(keyId)
      key.useTransaction(trx)
      key.is_avaible = isAvaible
      await key.save()

      await Promise.all([loan.load('user'), loan.load('key')])

      return loan
    })
  }

  public async getAll(user: User) {
    return KeyLoan.query().where('user_id', user.id).orderBy('created_at', 'desc').preload('key')
  }

  public async delete(loanId: number) {
    return await Database.transaction(async (trx) => {
      const keyloan = await KeyLoan.query()
        .useTransaction(trx)
        .where({ id: loanId })
        .preload('key')
        .firstOrFail()
      const key = await Key.query().useTransaction(trx).where({ id: keyloan.key.id }).first()

      await key?.merge({ is_avaible: true }).save()

      await keyloan.delete()
    })
  }

  public async show(loanId: number) {
    const loan = await KeyLoan.findOrFail(loanId)
    await loan.load('key')
    return loan
  }
}
export default new LoanService()
