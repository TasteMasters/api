export default class PasswordsNotMatchException extends Error {
  constructor(message) {
    super(message);
    this.name = 'PasswordsNotMatchException';
    this.statusCode = 400;
  }
}
