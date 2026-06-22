import { createCookie } from 'react-router';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const sidebarCookie = createCookie(SIDEBAR_COOKIE_NAME, {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secure: true,
    maxAge: SIDEBAR_COOKIE_MAX_AGE,
});
