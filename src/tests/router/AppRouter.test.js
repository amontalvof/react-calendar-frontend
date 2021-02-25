import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn();

describe('Tests in <AppRouter />', () => {
    test('should show Loading', () => {
        const initState = {
            auth: {
                checking: true,
            },
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').exists()).toBe(true);
    });

    test('should show the public route', () => {
        const initState = {
            auth: {
                checking: false,
                uid: null,
            },
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);
    });

    test('should show the private route', () => {
        const initState = {
            ui: {
                modalOpen: false,
            },
            calendar: {
                events: [],
            },
            auth: {
                checking: false,
                uid: '123abc',
                name: 'Andy',
            },
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
    });
});
