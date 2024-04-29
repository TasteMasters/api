export class RecipeIngredientEntity {
  #id;
  #recipe_id;
  #name;
  #amount;
  #image;
  #created_at;
  #updated_at;

  constructor({ id, recipe_id, name, amount, image, created_at, updated_at }) {
    this.#id = id;
    this.#recipe_id = recipe_id;
    this.#name = name;
    this.#amount = amount;
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

  get name() {
    return this.#name;
  }

  get amount() {
    return this.#amount;
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

  set name(name) {
    this.#name = name;
  }

  set amount(amount) {
    this.#amount = amount;
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
      name: this.#name,
      amount: this.#amount,
      image: this.#image,
    };
  }
}
