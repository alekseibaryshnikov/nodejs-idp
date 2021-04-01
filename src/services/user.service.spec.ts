import { UserService } from 'src/services/user.service';
import { SettingsService } from './settings/settings.service';
import * as crypto from 'crypto';

describe('LoginController', () => {
    describe('hash and salt', () => {
        it('should return true after salting', async () => {
            const password: string = 'password';
            const salt: string = 'salt';
            const settingsService: SettingsService = new SettingsService();
            const userService: UserService = new UserService(settingsService);
            const mock = jest.spyOn(settingsService, 'getSalt');
            mock.mockImplementation(() => Promise.resolve(salt));

            const test = crypto.createHash('SHA256').update(password + salt).digest('base64');
            const result = await userService.saltAndHashPassword(password);

            expect(result).toEqual(test);
        });
    });
});
