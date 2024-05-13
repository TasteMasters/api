export class WorkshopTopicsEntity {
  #id;
  #workshop_id;
  #title;
  #estimated_time;
  #description;
  #video_link;
  #completed;
  #created_at;
  #updated_at;

  constructor({ id, workshop_id, title, estimated_time, description, video_link, completed, created_at, updated_at }) {
    this.#id = id;
    this.#workshop_id = workshop_id;
    this.#title = title;
    this.#estimated_time = estimated_time;
    this.#description = description;
    this.#video_link = video_link;
    this.#completed = completed;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
  }

  get id() {
    return this.#id;
  }

  get workshop_id() {
    return this.#workshop_id;
  }

  get title() {
    return this.#title;
  }

  get estimated_time() {
    return this.#estimated_time;
  }

  get description() {
    return this.#description;
  }

  get video_link() {
    return this.#video_link;
  }

  get completed() {
    return this.#completed;
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

  set estimated_time(estimated_time) {
    this.#estimated_time = estimated_time;
  }

  set description(description) {
    this.#description = description;
  }

  set video_link(video_link) {
    this.#video_link = video_link;
  }

  set completed(completed) {
    this.#completed = completed;
  }

  set updated_at(updated_at) {
    this.#updated_at = updated_at;
  }

  toJson() {
    return {
      id: this.#id,
      workshop_id: this.#workshop_id,
      title: this.#title,
      estimated_time: this.#estimated_time,
      description: this.#description,
      video_link: this.#video_link,
      completed: this.#completed,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
    };
  }
}
