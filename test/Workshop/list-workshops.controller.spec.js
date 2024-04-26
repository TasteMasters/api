import request from 'supertest';
import { describe, it} from 'node:test';
import { deepEqual } from 'node:assert';

describe('FindAllWorkshops', () => {
  it('should return [] when there are no workshops', async () => {
    const result = await request('http://localhost:3001/v1')
      .get(`/workshops`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcxMjQ5NDIxNn0.weB7dsO581gkGEr1KzLzYOE8UpodhvtmndaFTU_YNNA'
      );
    deepEqual(result.body, [ { id: '4b2e3b96-8f86-42b1-8766-f5cc669699a7', creator: 'josafa', id_creator: '378cbd3b-6883-4977-849f-41e2804c0eed', title: 'Como fazer bolo', short_description: 'hahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdnd', long_description: 'hahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdndhahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdndhahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdndhahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdnd', difficulty: 'Fácil', category: 'bolos', data_hora_start: '2024-04-20T18:30:00.000Z', created_at: '2024-04-18T03:00:00.000Z' }, { id: '0483019a-291b-4b2e-8b9b-4bce3b5f1526', creator: 'josafa', id_creator: '378cbd3b-6883-4977-849f-41e2804c0eed', title: 'Como fazer bolo', short_description: 'hahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdnd', long_description: 'hahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdndhahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdndhahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdndhahaahahahahadkdkdjdubdheududbdhbcidbdbdnijdnjdnd', difficulty: 'Fácil', category: 'bolos', data_hora_start: '2024-04-25T18:30:00.000Z', created_at: '2024-04-18T03:00:00.000Z' } ]);
  });
});
