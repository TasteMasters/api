import { MulterError } from 'multer';
import { ZodError } from 'zod';

const ErrorHandler = (err, req, res, next) => {
  switch (err.constructor) {
    case ZodError:
      err.statusCode = 400;
      break;
    case MulterError:
      err.statusCode = 400;
      break;
  }

  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'dev' ? err.stack : {},
  });
  next();
};

export default ErrorHandler;
