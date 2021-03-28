import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OIDCService {
    public getAuthCode(salt: string): string {
        return Buffer.from(salt + new Date().getTime().toString()).toString('base64');
    }
}