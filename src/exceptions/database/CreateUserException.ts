export class CreateUserException extends Error {
  constructor(message: string) {
    super();
    this.message = `Error when creatig user. ERROR: ${message}`;
  }
}