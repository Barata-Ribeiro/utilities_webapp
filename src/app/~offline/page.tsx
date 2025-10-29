import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Offline',
};

export default function Page() {
    return (
        <>
            <h1>You are currently offline. Please check your internet connection.</h1>
            <h2>This app has limited functionality while offline.</h2>
        </>
    );
}
