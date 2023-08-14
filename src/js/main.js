// eslint-disable-next-line import/no-extraneous-dependencies
import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';

/**
 * JavaScript class importings
 */
import AppRouter from './router';
import Sidebar from './modules/sidebar';
import ThemeSwitcher from './modules/themeSwitcher';

/**
 * Initializes the Sidebar module.
 */
(() => new Sidebar())();

/**
 * Initializes the AppRouter module.
 */
(() => new AppRouter())();

/**
 * Initializes the ThemeSwitcher module.
 */
(() => new ThemeSwitcher())();
