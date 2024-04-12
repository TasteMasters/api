import request from 'supertest';
import { describe, it, before } from 'node:test';
import { deepEqual } from 'node:assert';
import { UserRepository } from '../../src/modules/User/repositories/user.repository.js';
import resetDb from '../resetDb.js';

describe('FindUserController', () => {
  let user;

  before(async () => {
    await resetDb();
    user = await UserRepository.create({ email: 'email@email.com', name: 'RandomName', password: 'pass1234' });
  });

  it('should be able to get a user', async () => {
    const result = await request('http://localhost:3001/v1')
      .get(`/users/${user.id}`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcxMjQ5NDIxNn0.weB7dsO581gkGEr1KzLzYOE8UpodhvtmndaFTU_YNNA'
      );

    deepEqual(user.id, result.body.id);
  });

  it('should not be able to get a user with a not exist id', async () => {
    const result = await request('http://localhost:3001/v1')
    .get(`/users/adfb5ecc-9a5d-4de0-8be3-3cbe35008482`)
    .set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcxMjQ5NDIxNn0.weB7dsO581gkGEr1KzLzYOE8UpodhvtmndaFTU_YNNA'
    );

    deepEqual(result.status, 404);
  });

  it('should not be able to get a user with invalid id', async () => {
    const result = await request('http://localhost:3001/v1')
      .get(`/users/invalid-id`)
      .set(
        'Authorization',+
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcxMjQ5NDIxNn0.weB7dsO581gkGEr1KzLzYOE8UpodhvtmndaFTU_YNNA'
      );

    deepEqual(result.status, 400);
  });
});
