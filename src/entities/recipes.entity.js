export class RecipeEntity {
  #id;
  #author_id;
  #title;
  #description;
  #created_at;
  #updated_at;

  constructor({ id, author_id, title, description, created_at, updated_at }) {
    this.#id = id;
    this.#author_id = author_id;
    this.#title = title;
    this.#description = description;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
  }

  get id() {
    return this.#id;
  }

  get author_id() {
    return this.#author_id;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get created_at() {
    return this.#created_at;
  }

  get updated_at() {
    return this.#updated_at;
  }

  set title(title) {
    this.#title = title;
  }

  set description(description) {
    this.#description = description;
  }

  set updated_at(updated_at) {
    this.#updated_at = updated_at;
  }

  toJson() {
    return {
      id: this.#id,
      author_id: this.#author_id,
      title: this.#title,
      description: this.#description,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
    };
  }
}
