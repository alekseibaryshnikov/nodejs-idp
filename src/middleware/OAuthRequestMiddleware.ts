import {  HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from "express";
import { validateObjectForFields } from '../utils/objectUtils';

@Injectable()
export class OAuthRequestMiddleware implements NestMiddleware {
    private OAuth = {
        clientId: 'client_id',
        responseType: 'response_type'
    };

    use(req: Request, _: Response, next: () => void) {
        if (!this.validateRequest(req)) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } else {
            next();
        }
    }

    /**
     * Validate request for required query variables.
     * Before this, test request for the type of protocol.
     * @param req HttpRequest.
     * @returns Boolean.
     */
    private validateRequest(req: Request): boolean {
        let testingObject: Object = {};

        if (req.method.toLowerCase() === 'post') {
            testingObject = req.body;
        } else if (req.method.toLowerCase() === 'get') {
            testingObject = req.query;
        } else {
            return false;
        }

        return validateObjectForFields(testingObject, this.OAuth);
    }
}
