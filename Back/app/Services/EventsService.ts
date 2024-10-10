import Events from 'App/Models/Events'

class EventsService {
  public async getAll() {
    return await Events.all()
  }
}

export default new EventsService()
