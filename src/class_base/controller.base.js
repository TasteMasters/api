import express from 'express';
import UnauthorizedException from '../exceptions/UnauthorizedException.js';
import { Message } from '../common/messages.js';

export default class BaseController {
  method;
  path;
  router;
  authenticated;

  constructor(method = 'GET', path = '/', authenticated = true) {
    this.router = express.Router();
    this.method = method;
    this.path = path;
    this.authenticated = authenticated;
  }

  register() {
    switch (this.method) {
      case 'GET':
        this.router.get(this.path, this.middleware.bind(this));
        break;
      case 'POST':
        this.router.post(this.path, this.middleware.bind(this));
        break;
      case 'DELETE':
        this.router.delete(this.path, this.middleware.bind(this));
        break;
      case 'PATCH':
        this.router.patch(this.path, this.middleware.bind(this));
        break;
      default:
        throw new Error('Method Unknow');
    }
    return this.router;
  }

  async middleware(req, res, next) {
    try {
      if (this.authenticated) {
        if (!req.authUser) {
          throw new UnauthorizedException(Message.UNAUTHORIZED);
        }

        this.handle(req, res, next);
      }else {
        this.handle(req, res, next);
      }
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
