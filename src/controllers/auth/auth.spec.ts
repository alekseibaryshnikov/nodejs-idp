import { Test } from '@nestjs/testing';
import { UserService } from 'src/services/user.service';
import { AuthController } from './auth.controller';
import * as mocks from 'node-mocks-http';

describe('LoginController', () => {
    let controller: AuthController;
    let res: any;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        checkCredentials: jest.fn(() => Promise.resolve(false))
                    }
                }
            ]
        }).compile();
        controller = moduleRef.get(AuthController);
        res = mocks.createResponse();
    });

    describe('root', () => {
        it('should return "False"', async () => {
            const result = await controller.login(res, { login: 'test', password: 'test' });
            expect(result).toBeFalsy();
        });
    });
});
