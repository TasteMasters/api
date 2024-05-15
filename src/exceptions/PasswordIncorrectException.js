export default class PasswordIncorrectException extends Error {
  constructor(message) {
    super(message);
    this.name = 'PasswordIncorrectException';
    this.statusCode = 400;
  }
}
