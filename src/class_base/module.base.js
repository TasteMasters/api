import express from 'express';

export default class ModuleBase {
  router;
  basePath;

  controllers;

  constructor() {
    this.router = express.Router();
  }

  init() {
    this.controllers.forEach((controller) => {
      this.router.use(`/${this.basePath}`, controller.register());
    });

    return this.router;
  }
}
