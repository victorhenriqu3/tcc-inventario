import Events from 'App/Models/Events'

class EventsService {
  public async getAll() {
    return await Events.all()
  }

  public async create({ name, description }) {
    return await Events.create({ name, description })
  }
}

export default new EventsService()
