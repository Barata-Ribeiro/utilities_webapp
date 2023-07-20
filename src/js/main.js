// eslint-disable-next-line import/no-extraneous-dependencies
import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';

// JavaScript Imports
import AppRouter from './router';
import Sidebar from './modules/sidebar';

// The new instances
(() => new AppRouter())();

(() => new Sidebar())();
