import {  HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthorizationRequestMiddleware implements NestMiddleware {
    private OAuth = {
        clientId: 'client_id',
        responseType: 'response_type'
    };

    private OIDC = {
        ...this.OAuth,
        scope: 'scope',
        redirectUri: 'redirect_uri'
    }

    private OIDCScope = 'openid';

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
        const query: Object = req.query;

        if (query[this.OIDC.scope] && query[this.OIDC.scope].indexOf(this.OIDCScope) !== -1) {
            return this.validateViaProtocol(this.OIDC, query);
        } else {
            return this.validateViaProtocol(this.OAuth, query);
        }
    }

    /**
     * Validate query string according to protocol.
     * @param protocol Object, type of protocol.
     * @param query Object, query string.
     * @returns Boolean
     */
    private validateViaProtocol(protocol: Object, query: Object): boolean {
        let valid: boolean = true;

        for (let key in protocol) {
            if (!query[protocol[key]]) {
                valid = false;
                break;
            }
        }

        return valid;
    }
}
