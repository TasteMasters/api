export class RecipeEntity {
  #id;
  #author_id;
  #title;
  #description;

  #ingredients;
  #tags;
  #images;

  #created_at;
  #updated_at;

  constructor({ id, author_id, title, description, created_at, updated_at, ingredients, tags, images }) {
    this.#id = id;
    this.#author_id = author_id;
    this.#title = title;
    this.#description = description;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
    this.#ingredients = ingredients;
    this.#tags = tags;
    this.#images = images;
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

  get ingredients() {
    return this.#ingredients;
  }

  get tags() {
    return this.#tags;
  }

  get images() {
    return this.#images;
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

  set ingredients(ingredients) {
    this.#ingredients = ingredients;
  }

  set tags(tags) {
    this.#tags = tags;
  }

  set images(images) {
    this.#images = images;
  }

  toJson() {
    let ingredients = [];
    if (this.#ingredients) {
      ingredients = this.#ingredients.map((ingredient) => ingredient.toJson());
    }

    let tags = [];
    if (this.#tags) {
      tags = this.#tags.map((tag) => tag.toJson());
    }

    let images = [];
    if (this.#images) {
      images = this.#images.map((image) => image.toJson());
    }

    return {
      id: this.#id,
      author_id: this.#author_id,
      title: this.#title,
      description: this.#description,
      ingredients,
      tags,
      images,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
    };
  }
}
