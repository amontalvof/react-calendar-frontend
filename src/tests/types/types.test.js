import { types } from '../../types/types';

describe('Tests in types.js', () => {
    test('should return the types', () => {
        expect(types).toEqual({
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',

            eventSetActive: '[event] Set active',
            eventLogout: '[event] Logout event',
            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] updated',
            eventDeleted: '[event] deleted',
            eventLoaded: '[event] loaded',

            authChecking: '[auth] Checking login state',
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
        });
    });
});
