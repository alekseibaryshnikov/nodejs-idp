import { Test } from '@nestjs/testing';
import { UserService } from 'src/services/user.service';
import { LoginController } from './login.controller';

describe('LoginController', () => {
    let controller: LoginController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [LoginController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        checkCredentials: jest.fn(() => Promise.resolve(false))
                    }
                }
            ]
        }).compile();
        controller = moduleRef.get(LoginController);
    });

    describe('root', () => {
        it('should return "False"', async () => {
            const result = await controller.login({ login: 'test', password: 'test' });
            expect(result).toBe(false);
        });
    });
});
