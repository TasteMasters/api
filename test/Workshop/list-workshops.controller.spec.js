import request from 'supertest';
import { describe, it } from 'node:test';
import { deepEqual } from 'node:assert';
import { WorkshopRepository } from '../../src/modules/Workshop/Repositories/workshop.repository.js';
import resetDb from '../resetDb.js';

describe('FindAllWorkshops', () => {
    it('should return undefined when there are no workshops', async () => {
        const result = await request('http://localhost:3001/v1')
            .get(`/workshops/`)
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcxMjQ5NDIxNn0.weB7dsO581gkGEr1KzLzYOE8UpodhvtmndaFTU_YNNA'
            );
        deepEqual(result.body, {});
    });
});
