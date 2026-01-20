/* Main JavaScript File - Entry point for all scripts */

// Import order is important for dependencies
// 1. Smooth scroll functionality
// 2. Animations and observers
// 3. User interactions

// Note: Since we're using simple script includes (not ES6 modules),
// these files will be loaded in the order specified in HTML
// This file serves as documentation of the loading order

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dương Spa - All scripts initialized');

    // Initialize i18n system
    if (typeof I18n !== 'undefined') {
        I18n.init();
    }
});