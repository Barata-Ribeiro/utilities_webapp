// eslint-disable-next-line import/no-extraneous-dependencies
import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';

// JavaScript Imports
import AppRouter from './router';
import Sidebar from './modules/sidebar';

// The new instances
(() => new AppRouter())();

const sidenav = document.querySelector('.sidenav');
const dropdowns = document.querySelectorAll('.dropdown');
const burger = document.querySelector('#burger');
const navLinks = sidenav.querySelectorAll('a');
(() => new Sidebar(sidenav, dropdowns, burger, navLinks))();
