// eslint-disable-next-line import/no-extraneous-dependencies
import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';

// JavaScript Imports
import AppRouter from './router';
import Sidebar from './modules/sidebar';
import ThemeSwitcher from './modules/themeSwitcher';

(() => new Sidebar())();

// The new instances
(() => new AppRouter())();

(() => new ThemeSwitcher())();
