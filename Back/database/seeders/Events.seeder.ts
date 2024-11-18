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
      {
        name: 'Semana da Ciência e Tecnologia',
        description:
          'Uma semana inteira dedicada a atividades como palestras, minicursos, experimentos e mostra de projetos.',
      },
      {
        name: 'Simpósio de Iniciação Científica',
        description:
          'Um evento para apresentar os resultados de pesquisas desenvolvidas por alunos de graduação e pós-graduação.',
      },
      {
        name: 'Jornada de Integração',
        description:
          'Um evento que reúne alunos de diferentes cursos para promover a interação e o trabalho em equipe.',
      },
      {
        name: 'Olimpíadas de Conhecimento',
        description:
          'Uma competição entre alunos de diferentes áreas do conhecimento, com provas teóricas e práticas.',
      },
    ])
  }
}
