/**
 * Workshop entity class.
 * @typedef {object} WorkshopEntityConstructor
 * @property {string} id - The workshop's identifier.
 * @property {string} description - The description of the workshop.
 * @property {string} category - The category of the workshop.
 * @property {string} difficulty - The difficulty level of the workshop.
 * @property {string} start_date - The start date of the workshop.
 * @property {string} creator_name - The name of the workshop's creator.
 * @property {string} creator_id - The ID of the workshop's creator (reference to users table).
 * @property {string} creator_experience - The experience of the workshop's creator.
 * @property {string[]} ingredients - The ingredients of the workshop.
 * @property {string} image - The image of the workshop.
 * @property {Date} created_at - The creation date of the workshop.
 * @property {Date | null} updated_at - The update date of the workshop.
 */
export class WorkshopEntity {
  /** @type {string} */
  #id;

  /** @type {string} */
  #description;

  /** @type {string} */
  #category;

  /** @type {string} */
  #difficulty;

  /** @type {string} */
  #start_date;

  /** @type {string} */
  #creator_name;

  /** @type {string} */
  #creator_id;

  /** @type {string} */
  #creator_experience;

  /** @type {string[]} */
  #ingredients;

  /** @type {string} */
  #image;

  /** @type {Date} */
  #created_at;

  /** @type {Date | null} */
  #updated_at;

  /**
   * Creates an instance of WorkshopEntity.
   * @param {WorkshopEntityConstructor} params - Workshop parameters.
   */
  constructor({
    id,
    description,
    category,
    difficulty,
    start_date,
    creator_name,
    creator_id,
    creator_experience,
    ingredients,
    image,
    created_at,
    updated_at,
  }) {
    this.#id = id;
    this.#description = description;
    this.#category = category;
    this.#difficulty = difficulty;
    this.#start_date = start_date;
    this.#creator_name = creator_name;
    this.#creator_id = creator_id;
    this.#creator_experience = creator_experience;
    this.#ingredients = ingredients;
    this.#image = image;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
  }

  /** Get the workshop's identifier. */
  get id() {
    return this.#id;
  }

  /** Get the workshop's description. */
  get description() {
    return this.#description;
  }

  /** Set the workshop's description. */
  set description(description) {
    this.#description = description;
  }

  /** Get the workshop's category. */
  get category() {
    return this.#category;
  }

  /** Set the workshop's category. */
  set category(category) {
    this.#category = category;
  }

  /** Get the workshop's difficulty. */
  get difficulty() {
    return this.#difficulty;
  }

  /** Set the workshop's difficulty. */
  set difficulty(difficulty) {
    this.#difficulty = difficulty;
  }

  /** Get the workshop's start date. */
  get start_date() {
    return this.#start_date;
  }

  /** Set the workshop's start date. */
  set start_date(start_date) {
    this.#start_date = start_date;
  }

  /** Get the name of the workshop's creator. */
  get creator_name() {
    return this.#creator_name;
  }

  /** Get the ID of the workshop's creator. */
  get creator_id() {
    return this.#creator_id;
  }

  /** Get the experience of the workshop's creator. */
  get creator_experience() {
    return this.#creator_experience;
  }

  /** Set the experience of the workshop's creator. */
  set creator_experience(creator_experience) {
    this.#creator_experience = creator_experience;
  }

  /** Get the ingredients of the workshop. */
  get ingredients() {
    return this.#ingredients;
  }

  /** Set the ingredients of the workshop. */
  set ingredients(ingredients) {
    this.#ingredients = ingredients;
  }

  /** Get the image of the workshop. */
  get image() {
    return this.#image;
  }

  /** Set the image of the workshop. */
  set image(image) {
    this.#image = image;
  }

  /** Get the creation date of the workshop. */
  get created_at() {
    return this.#created_at;
  }

  /** Set the creation date of the workshop. */
  set created_at(created_at) {
    this.#created_at = created_at;
  }

  /** Get the update date of the workshop. */
  get updated_at() {
    return this.#updated_at;
  }

  /** Set the update date of the workshop. */
  set updated_at(updated_at) {
    this.#updated_at = updated_at;
  }

  /**
   * Convert the workshop entity to JSON format.
   * @returns {Object} The workshop data in JSON format.
   */
  toJson() {
    return {
      id: this.#id,
      description: this.#description,
      category: this.#category,
      difficulty: this.#difficulty,
      start_date: this.#start_date,
      creator_name: this.#creator_name,
      creator_id: this.#creator_id,
      creator_experience: this.#creator_experience,
      ingredients: this.#ingredients,
      image: this.#image,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
    };
  }
}
