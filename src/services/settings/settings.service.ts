import { Injectable } from "@nestjs/common";
import { Settings } from "src/entities/settings.entity";
import { getRepository } from "typeorm";

@Injectable()
export class SettingsService {
    private settings = {
        SALT: 'salt'
    }

    public async getSalt() {
        try {
            const salt: Settings = await getRepository(Settings).findOne({name: this.settings.SALT});

            if (salt) {
                return salt.value;
            } else {
                throw Error(`Setting ${this.settings.SALT} doesn't exist. Check this setting in DB.`);
            }
        } catch(err) {
            throw Error(`Error when fetching setting 'salt'. ${err}`);
        }
    }
}