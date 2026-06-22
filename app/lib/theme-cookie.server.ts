import { createCookie } from 'react-router';

export type Theme = 'light' | 'dark' | 'system';

export const themeCookie = createCookie('utilities-webapp-theme', {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 365, // 1 year
});
