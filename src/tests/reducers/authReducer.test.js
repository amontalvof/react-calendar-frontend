import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initState = {
    checking: true,
};

describe('Tests in the authReducer', () => {
    test('should return the default state', () => {
        const action = {};
        const state = authReducer(initState, action);
        expect(state).toEqual(initState);
    });

    test('should login the user', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Andy',
            },
        };

        const state = authReducer(initState, action);
        expect(state).toEqual({ checking: false, uid: '123', name: 'Andy' });
    });
});
