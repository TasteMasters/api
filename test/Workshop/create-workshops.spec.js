import request from 'supertest';
import { describe, it } from 'node:test';
import { deepEqual } from 'node:assert';

describe('CreateWorkshopController', () => {
  it('should create a new workshop', async () => {
    // Dados do workshop a ser criado
    const workshopData = {
      creator: 'Chef Ruseel',
      id_creator: '16b9dc22-d56d-413a-bc53-4146eaaf3849',
      title: 'Fazendo bolos artísticos',
      short_description:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised ',
      long_description:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words',
      difficulty: 'Iniciante',
      category: 'Confeitaria',
      data_hora_start: '2024-04-20 15:30:00',
    };

    // Realiza a requisição para criar o workshop
    const result = await request('http://localhost:3001/v1')
      .post(`/workshops`)
      .send(workshopData)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcxMjQ5NDIxNn0.weB7dsO581gkGEr1KzLzYOE8UpodhvtmndaFTU_YNNA'
      );

    // Verifica se a resposta foi bem-sucedida e se o corpo da resposta é o esperado
    deepEqual(result.body, 'Evento criado com sucesso.');
    // Aqui você pode adicionar mais verificações conforme necessário
  });
});
