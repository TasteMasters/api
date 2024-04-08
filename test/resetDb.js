import { Client } from '../database/database.service.js';

export default async () => {
  await Client.query('DELETE FROM users');
};
