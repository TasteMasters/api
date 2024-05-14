import BCryptService from '../modules/Auth/bcrypt.service.js';

export class UserEntity {
  #id;
  #name;
  #email;
  #password;
  #experience;
  #photo;
  #specialization;

  #created_at;
  #updated_at;

  constructor({ id, name, email, password, experience, photo, specialization, created_at, updated_at }) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#password = password;
    this.#experience = experience;
    this.#photo = photo;
    this.#specialization = specialization;
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

  get experience() {
    return this.#experience;
  }

  get photo() {
    return this.#photo;
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

  get specialization() {
    return this.#specialization;
  }

  set updated_at(updated_at) {
    this.#updated_at = updated_at;
  }

  set experience(experience) {
    this.#experience = experience;
  }

  set photo(photo) {
    this.#photo = photo;
  }

  set specialization(specialization) {
    this.#specialization = specialization;
  }

  async verifyPassword(password) {
    return await BCryptService.compare(password, this.#password);
  }

  toJson() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      experience: this.#experience,
      photo: this.#photo,
      specialization: this.#specialization,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
    };
  }
}
