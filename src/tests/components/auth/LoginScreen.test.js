import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
);

describe('Tests in <LoginScreen />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should be displayed correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should call the login dispatch', () => {
        wrapper.find('input[name="loginEmail"]').simulate('change', {
            target: {
                name: 'loginEmail',
                value: 'andy@gmail.com',
            },
        });

        wrapper.find('input[name="loginPassword"]').simulate('change', {
            target: {
                name: 'loginPassword',
                value: '123456',
            },
        });
        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault() {},
        });

        expect(startLogin).toHaveBeenCalledWith('andy@gmail.com', '123456');
    });

    test('should no sign in if passwords are different', () => {
        wrapper.find('input[name="registerPassword1"]').simulate('change', {
            target: {
                name: 'registerPassword1',
                value: '123456',
            },
        });

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: '1234567',
            },
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault() {},
        });

        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith(
            'Error!',
            'Passwords must be the same.',
            'error'
        );
    });

    test('should sign in with equals passwords', () => {
        wrapper.find('input[name="registerName"]').simulate('change', {
            target: {
                name: 'registerName',
                value: 'Andy',
            },
        });

        wrapper.find('input[name="registerEmail"]').simulate('change', {
            target: {
                name: 'registerEmail',
                value: 'andy@gmail.com',
            },
        });

        wrapper.find('input[name="registerPassword1"]').simulate('change', {
            target: {
                name: 'registerPassword1',
                value: '123456',
            },
        });

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: '123456',
            },
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault() {},
        });

        expect(Swal.fire).not.toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalledWith(
            'andy@gmail.com',
            '123456',
            'Andy'
        );
    });
});
