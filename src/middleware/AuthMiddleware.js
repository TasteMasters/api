import { JwtService } from '../modules/Auth/jwt.service.js';
import { z } from 'zod';
import { UserRepository } from '../modules/User/repositories/user.repository.js';

const authDto = z.string().startsWith('Bearer ');

const AuthMiddleware = async (req, res, next) => {
  if (req.headers && req.headers.authorization !== undefined) {
    const authorization = authDto.safeParse(req.headers.authorization);

    if (authorization && authorization.success) {
      const token = authorization.data.replace('Bearer ', '');

      try {
        const jwtData = await JwtService.verify(token);

        const user = await UserRepository.findByEmail(jwtData.email);

        if (user) req.authUser = user;
      } catch (err) {
        next(err);
      }
    }
  }
  next();
};

export default AuthMiddleware;
