import { Injectable } from "@nestjs/common";
import { Settings } from "src/entities/settings.entity";
import { getRepository } from "typeorm";

@Injectable()
export class SettingsService {
    public static settings = {
        SALT: 'salt',
        EXPIRATIONS: 'expirations',
        TOKEN_SALT: 'token_salt'
    }

    public async getSettings(settingsType: string) {
        try {
            const settings: Settings = await getRepository(Settings).findOne({ name: SettingsService.settings[settingsType] });

            if (settings) {
                return settings.value;
            } else {
                throw Error(`Setting ${settingsType} doesn't exist. Check this settings in DB.`);
            }
        } catch (err) {
            throw Error(`Error when fetching setting 'salt'. ${err}`);
        }
    }
}