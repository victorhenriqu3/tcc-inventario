/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/me', 'AuthController.currentUser')
  Route.get('/users', 'AuthController.getByLevel')
  Route.delete('/users/:userId', 'AuthController.deleteUser')
})
  .middleware('auth')
  .prefix('/auth')

Route.group(() => {
  Route.get('/', 'KeysController.index')
  Route.get('/all', 'KeysController.showAll')
  Route.post('/', 'KeysController.create')
  Route.put('/:keyId', 'KeysController.update')
})
  .middleware('auth')
  .prefix('/keys')

Route.group(() => {
  Route.get('/', 'VisitorsController.getAll')
  Route.get('/:visitorId', 'VisitorsController.getById')
  Route.post('/', 'VisitorsController.create')
  Route.put('/:visitorId', 'VisitorsController.update')
  Route.put('/:visitorId/edit', 'VisitorsController.edit')
  Route.delete('/:visitorId', 'VisitorsController.delete')
})
  .middleware('auth')
  .prefix('/visitors')

Route.group(() => {
  Route.get('/', 'EventsController.index')
  Route.post('/', 'EventsController.create')
})
  .middleware('auth')
  .prefix('/events')

Route.group(() => {
  /*
  TODO: Create list KeyLoans with rangeDate
   */

  Route.delete('/:loanId', 'LoansController.deleteLoan')

  Route.get('/:loanId', 'LoansController.show')

  Route.get('/', 'LoansController.index')

  Route.put('/:loanId', 'LoansController.updateKey')

  Route.post('/', 'LoansController.create')
})
  .middleware('auth')
  .prefix('/key-loans')

Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
}).prefix('/auth')
