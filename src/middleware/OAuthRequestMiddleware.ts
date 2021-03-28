import {  HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from "express";
import { OAuthRequest } from "src/models/requests/OAuthRequest";

@Injectable()
export class OAuthRequestMiddleware implements NestMiddleware {

    use(req: Request, _: Response, next: Function) {
        if (!this.validateRequest(req)) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }

        next();
    }

    /**
     * Validate request for required query or body variables.
     * 
     * @param req HttpRequest
     * @returns boolean
     */
    validateRequest(req: Request): boolean {
        return this.testObjectForOAuth(this.checkTypeOfRequest(req));
    }
    
    /**
     * Test object for required parameters.
     * An object could be a request body or request query, it depends on the type of request POST and GET respectively.
     * 
     * @param obj object which we want to test
     * @returns boolean
     */
    testObjectForOAuth(obj: any): obj is OAuthRequest {
        if (!(obj as OAuthRequest).client_id) {
            return false;
        }

        if (!(obj as OAuthRequest).response_type) {
            return false;
        }

        return true;
    }
    
    /**
     * Check type of request. POST and GET are acceptable or exception will be thrown.
     * 
     * @param req express type of Request
     * @returns type of Request (OAuth | OIDC)
     */
    checkTypeOfRequest<T>(req: Request): T {
        if (req.method.toLowerCase() === 'post') {
            return req.body;
        }

        if (req.method.toLowerCase() === 'get') {
            return req.query as unknown as T;
        }

        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

}
