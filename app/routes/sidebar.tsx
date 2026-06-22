import { data } from 'react-router';
import { sidebarCookie } from '~/lib/sidebar-cookie.server';
import { Route } from '../routes/+types/sidebar';

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();

    const sidebar = String(formData.get('sidebar_state'));

    return data(
        { ok: true },
        {
            headers: {
                'Set-Cookie': await sidebarCookie.serialize(sidebar),
            },
        },
    );
}
