import express from 'express';
import UnauthorizedException from '../exceptions/UnauthorizedException.js';
import { Message } from '../common/messages.js';

export default class BaseController {
  method;
  path;
  router;
  authenticated;
  before = [];

  constructor(method = 'GET', path = '/', authenticated = true) {
    this.router = express.Router();
    this.method = method;
    this.path = path;
    this.authenticated = authenticated;
  }

  register() {
    const middlewareStack = [
      (req, res, next) => {
        if (this.authenticated && !req.authUser) {
          return next(new UnauthorizedException(Message.UNAUTHORIZED));
        }

        next();
      },
      ...this.before,
      this.middleware.bind(this),
    ];

    switch (this.method) {
      case 'GET':
        this.router.get(this.path, ...middlewareStack);
        break;
      case 'POST':
        this.router.post(this.path, ...middlewareStack);
        break;
      case 'DELETE':
        this.router.delete(this.path, ...middlewareStack);
        break;
      case 'PATCH':
        this.router.patch(this.path, ...middlewareStack);
        break;
      default:
        throw new Error('Method Unknow');
    }
    return this.router;
  }

  async middleware(req, res, next) {
    try {
      this.handle(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  async handle(req, res, next) {}

  /**
   * @typedef ResponseData
   * @type {object}
   * @property {Object} data
   * @property {number} statusCode
   */

  /**
   *
   * @param {express.Response} res
   * @param {ResponseData}
   */
  send(res, { data = {}, statusCode = 200 } = {}) {
    res.status(statusCode).send(data);
  }
}
