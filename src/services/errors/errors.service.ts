import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class ErrorSerivce {
  getErrorMessage(error: string): string {
    return {
      [ErrorTypes.InvalidAuthCode]: 'Invalid auth code. Please, authenticate again.',
      [ErrorTypes.UserNotFoundError]: 'User not found! Please, authenticate again.',
      [ErrorTypes.InvalidResponseType]: `Response type doesn't match with flow type. Chose response type according to chosen authorization flow.`,
      [ErrorTypes.MissedRedirectUrl]: `Missed redirect URL.`,
      [ErrorTypes.UnexpectedError]: 'Unexpected error.',
      ['default']: 'Unexpected error.'
    }[error];
  }

  redirectToAuthPage(res: Response, error: string) {
    res.redirect(`/auth?&error=${error}`);
  }
}

export enum ErrorTypes {
  InvalidAuthCode = 'InvalidAuthCode',
  InvalidResponseType = 'InvalidResponseType',
  MissedRedirectUrl = 'MissedRedirectUrl',
  UserNotFoundError = 'UserNotFoundError',
  UnexpectedError = 'UnexpectedError'
}