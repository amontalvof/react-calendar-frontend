import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);
Storage.prototype.setItem = jest.fn();
let token = '';

describe('Tests on auth actions', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('startLogin should work', async () => {
        await store.dispatch(startLogin('andy@gmail.com', '123456'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            },
        });
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'token',
            expect.any(String)
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'token-init-time',
            expect.any(Number)
        );

        token = localStorage.setItem.mock.calls[0][1];
    });

    test('startLogin should not work with wrong credentials', async () => {
        await store.dispatch(startLogin('andy@gmail.com', '1234567890'));
        const actions = store.getActions();
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith(
            'Error!',
            'Invalid password.',
            'error'
        );

        await store.dispatch(startLogin('andy2@gmail.com', '123456'));
        expect(Swal.fire).toHaveBeenCalledWith(
            'Error!',
            'There is no user with that email.',
            'error'
        );
    });

    test('startRegister should work', async () => {
        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'test',
                    token: 'abc123abc123',
                };
            },
        }));
        await store.dispatch(startRegister('test@gmail.com', '123456', 'Test'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test',
            },
        });
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'token',
            'abc123abc123'
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'token-init-time',
            expect.any(Number)
        );
    });

    test('startChecking should work', async () => {
        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'test',
                    token: 'abc123abc123',
                };
            },
        }));
        await store.dispatch(startChecking());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test',
            },
        });
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'token',
            'abc123abc123'
        );
    });
});
