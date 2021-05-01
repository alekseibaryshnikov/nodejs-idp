import { Test } from '@nestjs/testing';
import { UserService } from 'src/services/user.service';
import { LoginController } from './login.controller';
import * as mocks from 'node-mocks-http';

describe('LoginController', () => {
    let controller: LoginController;
    let res: any;

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
        res = mocks.createResponse();
    });

    describe('root', () => {
        it('should return "False"', async () => {
            const result = await controller.login(res, { login: 'test', password: 'test' });
            expect(result).toBeFalsy();
        });
    });
});
