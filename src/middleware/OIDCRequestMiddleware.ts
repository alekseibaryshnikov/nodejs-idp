import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from "express";
import { OIDCRequest } from "src/models/requests/OIDCRequest";
import { OAuthRequestMiddleware } from "./OAuthRequestMiddleware";

@Injectable()
export class OIDCRequestMiddleware extends OAuthRequestMiddleware implements NestMiddleware {

    use(req: Request, _: Response, next: Function) {
        if (this.isOIDC(super.checkTypeOfRequest<OIDCRequest>(req)) && !this.validateRequest(req)) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }

        next();
    }

    /**
     * Extend OAuth request check for OIDC required parameters.
     * 
     * @param req Express request
     * @returns boolean
     */
    validateRequest(req: Request): boolean {
        return super.validateRequest(req) && this.testObjectForOIDC(super.checkTypeOfRequest<OIDCRequest>(req));
    }

    /**
     * Test an obj for for required OIDC parameters.
     * 
     * @param obj testing object 
     * @returns boolean
     */
    private testObjectForOIDC(obj: any): obj is OIDCRequest {
        const oidcObj = (obj as OIDCRequest);
        
        if (!oidcObj.redirect_uri) {
            return false;
        }

        return true;
    }

    /**
     * Ensure that this is OIDC request.
     * 
     * @param obj request object
     * @returns boolean
     */
    private isOIDC(obj: OIDCRequest): boolean {
        return obj.scope && obj.scope.indexOf('openid') !== -1;
    }

}