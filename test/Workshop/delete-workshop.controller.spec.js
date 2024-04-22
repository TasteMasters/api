import request from 'supertest';
import { describe, it } from 'node:test';
import { deepEqual } from 'node:assert';

describe('DeleteWorkshopById', () => {
  it('should return "ID inválido" and status code 400 when an invalid ID is provided', async () => {
    const result = await request('http://localhost:3001/v1')
      .delete(`/workshops/id-not-valid`) // Fornecer um ID inválido, mas válido em formato
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcxMjQ5NDIxNn0.weB7dsO581gkGEr1KzLzYOE8UpodhvtmndaFTU_YNNA'
      );

    deepEqual(result.status, 404);
    deepEqual(result.body.message, 'ID inválido');
  });
});

describe('FindWorkshopById', () => {
  it('should return "Erro ao deletar evento" when a valid but non-existent ID is provided', async () => {
    const validUUID = 'adfb5ecc-9a5d-4de0-8be3-3cbe35008482';
    const result = await request('http://localhost:3001/v1')
      .delete(`/workshops/${validUUID}`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcxMjQ5NDIxNn0.weB7dsO581gkGEr1KzLzYOE8UpodhvtmndaFTU_YNNA'
      );

    deepEqual(result.status, 404);
    deepEqual(result.body.message, 'Erro ao deletar evento');
  });
});
