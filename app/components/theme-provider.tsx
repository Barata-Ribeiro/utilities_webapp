import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { useFetcher } from 'react-router';

export type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
    children: React.ReactNode;
    initialTheme: Theme;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children, initialTheme }: Readonly<ThemeProviderProps>) {
    const fetcher = useFetcher();

    const [theme, setTheme] = useState<Theme>(initialTheme);

    useLayoutEffect(() => {
        const root = document.documentElement;

        root.classList.remove('light', 'dark');

        const preferredColorScheme = globalThis.window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';

        const resolvedTheme = theme === 'system' ? preferredColorScheme : theme;

        root.classList.add(resolvedTheme);
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme: (theme: Theme) => {
                setTheme(theme);

                fetcher.submit(
                    { theme },
                    {
                        method: 'post',
                        action: '/theme',
                    },
                );
            },
        }),
        [theme, fetcher],
    );

    return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeProviderContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}
