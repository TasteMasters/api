import bcrypt from 'bcrypt';

export default class BCryptService {
  static async hash(password) {
    return await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
  }

  static async compare(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}
