export default class EmailOrPasswordIncorrectException extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmailOrPasswordIncorrect';
    this.statusCode = 401;
  }
}
