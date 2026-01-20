/**
 * Simple i18n manager for Duong Spa
 * Handles multi-language support for Vietnamese, English, and Korean
 */

const I18n = {
    currentLang: 'vi', // Default language
    translations: {},
    supportedLanguages: ['vi', 'en', 'ko'],

    /**
     * Initialize i18n system
     */
    async init() {
        try {
            // Hide body until translations are loaded
            document.body.style.opacity = '0';

            // Load all translation files first
            await this.loadTranslations();

            // Verify translations loaded
            if (Object.keys(this.translations).length === 0) {
                console.error('No translations loaded! Check if JSON files exist in locales/ folder');
                alert('Error: Could not load language files. Please refresh the page or contact support.');
                return;
            }

            // Check if there's a saved language preference
            const savedLang = localStorage.getItem('duongspa_language');
            console.log('Saved language in localStorage:', savedLang);

            if (savedLang && this.supportedLanguages.includes(savedLang)) {
                // User has already selected a language
                this.currentLang = savedLang;
                console.log(`Loading saved language: ${savedLang}`);
                this.applyTranslations();
                this.setupLanguageSelector();

                // Show body with fade in
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '1';
            } else {
                // First time visitor - show language selection modal
                console.log('No saved language, showing modal');
                // Show body first for modal to be visible
                document.body.style.opacity = '1';
                this.showLanguageModal();
            }
        } catch (error) {
            console.error('Error initializing i18n:', error);
            document.body.style.opacity = '1';
        }
    },

    /**
     * Show language selection modal for first-time visitors
     */
    showLanguageModal() {
        const modal = document.getElementById('language-modal');
        if (!modal) return;

        // Show the modal
        modal.style.display = 'flex';

        // Highlight Vietnamese option by default
        const viOption = modal.querySelector('[data-lang="vi"]');
        if (viOption) {
            viOption.classList.add('selected');
        }

        // Add click handlers to language options
        const languageOptions = modal.querySelectorAll('.language-option');
        languageOptions.forEach((option) => {
            option.addEventListener('click', (e) => {
                // Remove selected class from all options
                languageOptions.forEach(opt => opt.classList.remove('selected'));

                // Add selected class to clicked option
                option.classList.add('selected');

                // Get selected language
                const selectedLang = option.getAttribute('data-lang');

                // Set language and close modal
                this.changeLanguage(selectedLang);

                // Hide modal with fade out effect
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.style.opacity = '1';
                }, 300);

                // Setup language selector after modal is closed
                setTimeout(() => {
                    this.setupLanguageSelector();
                    // Force update the current language display
                    this.updateLanguageSelectorState();
                }, 400);
            });
        });
    },

    /**
     * Load translation files
     */
    async loadTranslations() {
        try {
            // Check if TRANSLATIONS is available (from translations-full.js)
            if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS) {
                console.log('Using embedded translations');
                this.translations = TRANSLATIONS;
                console.log('All translations loaded:', this.translations);
                return;
            }

            // Fallback: try to fetch from JSON files (requires web server)
            console.log('Attempting to fetch translations from JSON files...');
            const promises = this.supportedLanguages.map(async (lang) => {
                const response = await fetch(`locales/${lang}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${lang}.json: ${response.status}`);
                }
                const data = await response.json();
                this.translations[lang] = data;
                console.log(`Loaded translations for ${lang}:`, data);
            });

            await Promise.all(promises);
            console.log('All translations loaded from JSON:', this.translations);
        } catch (error) {
            console.error('Failed to load translations:', error);
            throw error;
        }
    },

    /**
     * Get translation by key
     * @param {string} key - Translation key (e.g., 'nav.home')
     * @returns {string} - Translated text
     */
    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        if (!value) {
            console.error(`No translations found for language: ${this.currentLang}`);
            return key;
        }

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key} for language: ${this.currentLang}`);
                return key;
            }
        }

        return value;
    },

    /**
     * Change language
     * @param {string} lang - Language code
     */
    changeLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.error(`Unsupported language: ${lang}`);
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('duongspa_language', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update page title
        document.title = this.t('meta.title');

        // Apply translations
        this.applyTranslations();

        // Update language selector active state
        this.updateLanguageSelectorState();
    },

    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations() {
        console.log(`Applying translations for language: ${this.currentLang}`);
        console.log('Translations available:', this.translations);

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        console.log(`Found ${elements.length} elements with data-i18n`);

        elements.forEach((element) => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                // Check if translation contains HTML tags
                if (translation.includes('<')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update page title
        document.title = this.t('meta.title');
        console.log('Translations applied successfully');
    },

    /**
     * Set up language selector event listeners
     */
    setupLanguageSelector() {
        const dropdown = document.querySelector('.language-dropdown');
        const currentBtn = document.getElementById('lang-current');
        const dropdownMenu = document.getElementById('lang-dropdown-menu');
        const langOptions = document.querySelectorAll('.lang-option');

        if (!currentBtn || !dropdownMenu) return;

        // Toggle dropdown - support both click and touch
        const toggleDropdown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');

            console.log('Dropdown toggle triggered, isOpen:', isOpen);

            if (isOpen) {
                // Close
                dropdown.classList.remove('open');
                dropdownMenu.style.display = 'none';
                console.log('Dropdown closed');
            } else {
                // Open
                dropdown.classList.add('open');
                dropdownMenu.style.display = 'block';
                console.log('Dropdown opened');
            }
        };

        currentBtn.addEventListener('click', toggleDropdown);
        currentBtn.addEventListener('touchstart', toggleDropdown, { passive: false });

        // Close dropdown when clicking/touching outside
        const closeDropdown = (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                dropdownMenu.style.display = 'none';
            }
        };

        document.addEventListener('click', closeDropdown);
        document.addEventListener('touchstart', closeDropdown);

        // Handle language selection - support both click and touch
        const selectLanguage = (option) => (e) => {
            e.preventDefault();
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            console.log('Language selected:', lang);
            this.changeLanguage(lang);
            dropdown.classList.remove('open');
            dropdownMenu.style.display = 'none';
        };

        langOptions.forEach((option) => {
            option.addEventListener('click', selectLanguage(option));
            option.addEventListener('touchstart', selectLanguage(option), { passive: false });
        });

        // Set initial active state
        this.updateLanguageSelectorState();
    },

    /**
     * Update language selector active state
     */
    updateLanguageSelectorState() {
        const currentText = document.querySelector('.lang-current-text');
        const langOptions = document.querySelectorAll('.lang-option');

        console.log('Updating language selector to:', this.currentLang);
        console.log('Current text element:', currentText);

        // Update current button text
        if (currentText) {
            const langMap = {
                'vi': 'VI',
                'en': 'EN',
                'ko': 'KO'
            };
            const newText = langMap[this.currentLang] || 'VI';
            currentText.textContent = newText;
            console.log('Updated text to:', newText);
        } else {
            console.error('Cannot find .lang-current-text element!');
        }

        // Update active state in dropdown
        langOptions.forEach((option) => {
            const lang = option.getAttribute('data-lang');
            if (lang === this.currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    },

    /**
     * Get language name for display
     * @param {string} lang - Language code
     * @returns {string} - Language display name
     */
    getLanguageName(lang) {
        const names = {
            'vi': 'VI',
            'en': 'EN',
            'ko': '한국어'
        };
        return names[lang] || lang.toUpperCase();
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}
