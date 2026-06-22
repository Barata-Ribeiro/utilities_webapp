import { data } from 'react-router';
import { themeCookie } from '~/lib/theme-cookie.server';
import type { Route } from '../routes/+types/theme';

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();

    const theme = String(formData.get('theme'));

    return data(
        { ok: true },
        {
            headers: {
                'Set-Cookie': await themeCookie.serialize(theme),
            },
        },
    );
}
