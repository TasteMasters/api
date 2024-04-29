import { JwtService } from '../modules/Auth/jwt.service.js';
import { UserRepository } from '../modules/User/repositories/user.repository.js';

const AuthMiddleware = async (req, res, next) => {
  const tokenCookie = req.cookies.token;
  if (tokenCookie) {
    try {
      const jwtData = await JwtService.verify(tokenCookie);

      const user = await UserRepository.findById(jwtData.id);

      if (user) req.authUser = user;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  next();
};

export default AuthMiddleware;
