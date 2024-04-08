import BCryptService from '../modules/Auth/bcrypt.service.js';

/**
 * @typedef UserEntityConstructor
 * @type {object}
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {Date} created_at
 * @property {Date | null} updated_at
 */

export class UserEntity {
  /** @type {string} */
  #id;
  /** @type {string} */
  #name;
  /** @type {string} */
  #email;
  /** @type {string} */
  #password;
  /** @type {Date} */
  #created_at;
  /** @type {Date | null} */
  #updated_at;

  /**
   *
   * @param {UserEntityConstructor}
   */
  constructor({ id, name, email, password, created_at, updated_at }) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#password = password;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get email() {
    return this.#email;
  }

  set password(password) {
    this.#password = password;
  }

  set email(email) {
    this.#email = email;
  }

  get created_at() {
    return this.#created_at;
  }

  get updated_at() {
    return this.#updated_at;
  }

  set updated_at(updated_at) {
    this.#updated_at = updated_at;
  }

  /**
   *
   * @param {string} password
   * @returns {boolean}
   */
  async verifyPassword(password) {
    return await BCryptService.compare(password, this.#password);
  }

  toJson() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
    };
  }
}
