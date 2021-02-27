import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import {
    eventStartUpdate,
    eventClearActiveEvent,
    eventStartAddNew,
} from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hello world',
            notes: 'some notes',
            start: now.toDate(),
            end: nowPlus1.toDate(),
        },
    },
    auth: {
        uid: '123',
        name: 'Andy',
    },
    ui: {
        modalOpen: true,
    },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
);

describe('Tests in <CalendarModal />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should show the modal', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });

    test('should call the update and close the modal action', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() {},
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(
            initState.calendar.activeEvent
        );
        expect(eventClearActiveEvent).toHaveBeenCalled();
    });

    test('should show error if title is missing', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() {},
        });

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(
            true
        );
    });

    test('should create a new event', () => {
        const initState = {
            calendar: {
                events: [],
                activeEvent: null,
            },
            auth: {
                uid: '123',
                name: 'Andy',
            },
            ui: {
                modalOpen: true,
            },
        };
        const store = mockStore(initState);
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello test',
            },
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() {},
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hello test',
            notes: '',
        });

        expect(eventClearActiveEvent).toHaveBeenCalled();
    });

    test('should validate the dates', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello test',
            },
        });

        const today = new Date();
        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() {},
        });

        expect(Swal.fire).toHaveBeenCalledWith(
            'Error!',
            'The finish date must be greater than the start date.',
            'error'
        );
    });
});
