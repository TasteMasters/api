export class RecipeImagesEntity {
  #id;
  #recipe_id;
  #image;
  #created_at;
  #updated_at;

  constructor({ id, recipe_id, image, created_at, updated_at }) {
    this.#id = id;
    this.#recipe_id = recipe_id;
    this.#image = image;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
  }

  get id() {
    return this.#id;
  }

  get recipe_id() {
    return this.#recipe_id;
  }

  get image() {
    return this.#image;
  }

  get created_at() {
    return this.#created_at;
  }

  get updated_at() {
    return this.#updated_at;
  }

  set image(image) {
    this.#image = image;
  }

  set updated_at(updated_at) {
    this.#updated_at = updated_at;
  }

  toJson() {
    return {
      id: this.#id,
      image: this.#image,
    };
  }
}
