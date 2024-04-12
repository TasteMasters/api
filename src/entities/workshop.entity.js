/**
    @typedef WorkshopEntityConstructor
    @type {object}
    @property {string} id - The workshop's identifier.
    @property {string} title - The title of the workshop.
    @property {string} instructor - The instructor of the workshop.
    @property {Date} created_at - The creation date of the workshop.
    @property {Date | null} updated_at - The update date of the workshop.
    @property {Date} start_event - The start date of the workshop event.
    @property {string} duration - Represents the duration of the event.
    @property {number} capacity - Represents the capacity of people who can participate (number of spots).
    @property {number} cost - Represents the cost of the workshop.
    @property {string} category - Represents the sub-niche (e.g., Confectionery).
    @property {string} difficulty - Represents the target audience's level.
*/

export class WorkshopEntity {
  
  /** @type {string} */
  #id;

  /** @type {string} */
  #title;

  /** @type {string} */
  #instructor;

  /** @type {Date} */
  #created_at;

  /** @type {Date | null} */
  #updated_at;

  /** @type {Date} */
  #start_event

  /** @type {string} */
  #duration

  /** @type {number} */
  #capacity

  /** @type {number} */
  #cost

  /** @type {string} */
  #category

  /** @type {string} */
  #difficulty

  /**
   *
   * @param {WorkshopEntityConstructor}
   */

  constructor({ id, title, instructor, created_at, updated_at, start_event, duration, capacity, cost, category, difficulty}) {
    this.#id = id;
    this.#title = title;
    this.#instructor = instructor;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
    this.#start_event = start_event;
    this.#duration = duration;
    this.#capacity = capacity;
    this.#cost = cost;
    this.#category = category;
    this.#difficulty = difficulty;
  }

  /** Get the workshop's identifier. */
    get id() {
    return this.#id;
    }
    
    /** Get the workshop's title. */
    get title() {
    return this.#title;
    }
    
    /** Set the workshop's title. */
    set title(title) {
    this.#title = title;
    }
    
    /** Get the workshop's instructor. */
    get instructor() {
    return this.#instructor;
    }
    
    /** Set the workshop's instructor. */
    set instructor(instructor) {
    this.#instructor = instructor;
    }
    
    /** Get the creation date of the workshop. */
    get created_at() {
    return this.#created_at;
    }
    
    /** Get the update date of the workshop. */
    get updated_at() {
    return this.#updated_at;
    }
    
    /** Set the update date of the workshop. */
    set updated_at(updated_at) {
    this.#updated_at = updated_at;
    }
    
    /** Get the start date of the workshop event. */
    get start_event() {
    return this.#start_event;
    }
    
    /** Set the start date of the workshop event. */
    set start_event(start_event) {
    this.#start_event = start_event;
    }
    
    /** Get the duration of the event. */
    get duration() {
    return this.#duration;
    }
    
    /** Set the duration of the event. */
    set duration(duration) {
    this.#duration = duration;
    }
    
    /** Get the capacity of people who can participate. */
    get capacity() {
    return this.#capacity;
    }
    
    /** Set the capacity of people who can participate. */
    set capacity(capacity) {
    this.#capacity = capacity;
    }
    
    /** Get the cost of the workshop. */
    get cost() {
    return this.#cost;
    }
    
    /** Set the cost of the workshop. */
    set cost(cost) {
    this.#cost = cost;
    }
    
    /** Get the category of the workshop. */
    get category() {
    return this.#category;
    }
    
    /** Set the category of the workshop. */
    set category(category) {
    this.#category = category;
    }
    
    /** Get the difficulty of the workshop. */
    get difficulty() {
    return this.#difficulty;
    }
    
    /** Set the difficulty of the workshop. */
    set difficulty(difficulty) {
    this.#difficulty = difficulty;
    }

  toJson() {
    return {
      id: this.#id,
      title: this.#title,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
      start_event: this.#start_event,
      duration: this.#duration,
      capacity: this.#capacity,
      cost: this.#cost,
      category: this.#category,
      difficulty: this.#difficulty
    };
  }
}
