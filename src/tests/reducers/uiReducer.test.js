import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

const initState = {
    modalOpen: false,
};

describe('Tests in the uiReducer', () => {
    test('should return the default state', () => {
        const state = uiReducer(initState, {});
        expect(state).toEqual(initState);
    });

    test('should open and close the modal', () => {
        const modalOpen = uiOpenModal();
        const modalClose = uiCloseModal();

        const state = uiReducer(initState, modalOpen);
        expect(state).toEqual({ modalOpen: true });

        const stateClose = uiReducer(initState, modalClose);
        expect(stateClose).toEqual({ modalOpen: false });
    });
});
