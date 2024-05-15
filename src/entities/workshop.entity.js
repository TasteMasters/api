export class WorkshopEntity {
  #id;

  #title;

  #description;

  #category;

  #difficulty;

  #start_date;

  #creator_id;

  #ingredients;

  #image;

  #created_at;

  #updated_at;

  #topics;

  /**
   * Creates an instance of WorkshopEntity.
   * @param {WorkshopEntityConstructor} params - Workshop parameters.
   */
  constructor({
    id,
    title,
    description,
    category,
    difficulty,
    start_date,
    creator_id,
    ingredients,
    image,
    topics,
    created_at,
    updated_at,
  }) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#category = category;
    this.#difficulty = difficulty;
    this.#start_date = start_date;
    this.#creator_id = creator_id;
    this.#ingredients = ingredients;
    this.#image = image;
    this.#topics = topics;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
  }

  /** Get the workshop's identifier. */
  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
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
  get topics() {
    return this.#topics;
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

  set title(title) {
    this.#title = title;
  }

  /** Get the workshop's start date. */
  get start_date() {
    return this.#start_date;
  }

  /** Set the workshop's start date. */
  set start_date(start_date) {
    this.#start_date = start_date;
  }

  set topics(topics) {
    this.#topics = topics;
  }

  /** Get the ID of the workshop's creator. */
  get creator_id() {
    return this.#creator_id;
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
    const topics = [];

    if (this.#topics) {
      for (const topic of this.#topics) {
        topics.push(topic.toJson());
      }
    }

    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      category: this.#category,
      difficulty: this.#difficulty,
      start_date: this.#start_date,
      creator_id: this.#creator_id,
      ingredients: this.#ingredients,
      image: this.#image,
      topics,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
    };
  }
}
