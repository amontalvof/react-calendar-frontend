import { types } from '../types/types';

// {
//     id: '3523551351353535535131',
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(1, 'hours').toDate(),
//     notes: 'comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Andy',
//     },
// }

const initialState = {
    events: [],
    activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            };
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload],
            };
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null,
            };
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map((event) =>
                    event.id === action.payload.id ? action.payload : event
                ),
            };
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    (event) => event.id !== state.activeEvent.id
                ),
                activeEvent: null,
            };
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload],
            };
        case types.eventLogout:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
