import { Injectable } from "@nestjs/common";
import { Settings } from "src/entities/settings.entity";
import { Connection, createConnection, getRepository } from "typeorm";

@Injectable()
export class SettingsService {
    private connetion: Connection;
    private settings = {
        SALT: 'salt'
    }

    public async getSalt() {
        try {
            this.connetion = await createConnection();
            const salt: Settings = await getRepository(Settings).findOne({name: this.settings.SALT});
            
            return salt.value;
        } catch(err) {
            console.error(`Error when fetching setting 'salt'. ${err}`);
        } finally {
            this.connetion && this.connetion.close();
        }
    }
}