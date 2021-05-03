import { Injectable } from "@nestjs/common";

@Injectable()
export class ErrorSerivce {
  getErrorMessage(error: string): string {
    if (error === Types.InvalidAuthCode) {
      return 'Invalid auth code. Please, authenticate again.'
    }

    return 'Unexpected error.'
  }

  setInvalidAuthCodeErorr(): string {
    return Types.InvalidAuthCode;
  }
}

enum Types {
  InvalidAuthCode = 'InvalidAuthCode',
  UnexpectedError = 'UnexpectedError'
}