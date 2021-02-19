import Swal from 'sweetalert2';
import { fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-time', new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } else {
            Swal.fire('Error!', body.message, 'error');
        }
    };
};

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await fetchSinToken(
            'auth/new',
            { email, password, name },
            'POST'
        );
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-time', new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } else {
            Swal.fire('Error!', body.message, 'error');
        }
    };
};

const login = (user) => ({
    type: types.authLogin,
    payload: user,
});
