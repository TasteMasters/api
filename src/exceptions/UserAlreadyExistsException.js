export default class UserAlreadyExistsException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserAlreadyExistsException';
    this.statusCode = 409;
  }
}
