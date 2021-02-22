import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Tests in the helper fetch', () => {
    let token = '';

    test('fetchWithoutToken should work', async () => {
        const resp = await fetchWithoutToken(
            'auth',
            {
                email: 'andy@gmail.com',
                password: '123456',
            },
            'POST'
        );

        expect(resp instanceof Response).toBe(true);
        const body = await resp.json();
        expect(body.ok).toBe(true);

        token = body.token;
    });

    test('fetchWithToken should work', async () => {
        localStorage.setItem('token', token);

        const resp = await fetchWithToken(
            'events/602ca4f15513113d4b5c0873',
            {},
            'DELETE'
        );

        const body = await resp.json();
        expect(body.message).toBe('There is no event for that id.');
    });
});
