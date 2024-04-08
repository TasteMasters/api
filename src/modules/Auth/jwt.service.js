import jwt from 'jsonwebtoken';

export class JwtService {
  static async create(data) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  static async verify(token) {
    return await jwt.verify(token, process.env.JWT_SECRET);
  }
}
