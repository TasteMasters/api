export class RecipeTagsEntity {
  #id;
  #recipe_id;
  #tag_id;

  #tag;

  #created_at;
  #updated_at;

  constructor({ id, recipe_id, tag_id, created_at, updated_at }) {
    this.#id = id;
    this.#recipe_id = recipe_id;
    this.#tag_id = tag_id;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
  }

  get id() {
    return this.#id;
  }

  get recipe_id() {
    return this.#recipe_id;
  }

  get tag_id() {
    return this.#tag_id;
  }

  get created_at() {
    return this.#created_at;
  }

  get updated_at() {
    return this.#updated_at;
  }

  get tag() {
    return this.#tag;
  }

  set tag(tag) {
    this.#tag = tag;
  }

  toJson() {
    return {
      tag_id: this.#tag_id,
      tag: this.#tag,
    };
  }
}
