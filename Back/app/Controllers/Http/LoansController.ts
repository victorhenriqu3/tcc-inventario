import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import KeyLoan from 'App/Models/KeyLoan'
import LoanService from 'App/Services/LoanService'

export default class LoansController {
  public async create({ auth, request }: HttpContextContract) {
    const validated = await request.validate({
      schema: schema.create({
        keyId: schema.number(),
        reason: schema.string(),
        responsiblePerson: schema.object().members({
          name: schema.string(),
          register: schema.string(),
          phone: schema.string(),
        }),
      }),
    })

    return await LoanService.create({ ...validated, user: auth.user! })
  }

  public async index({ auth }: HttpContextContract) {
    const { user } = auth

    return await LoanService.getAll(user!)
  }

  public async updateKey({ request }: HttpContextContract) {
    const loanId = request.param('loanId')
    return await LoanService.update(loanId)
  }

  public async deleteLoan({ request }: HttpContextContract) {
    const loanId = request.param('loanId')
    const keyloan = await KeyLoan.findOrFail(loanId)

    return await keyloan.delete()
  }
}
