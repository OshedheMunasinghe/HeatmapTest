import * as Localization from 'expo-localization';
import I18n from 'i18n-js';

// import translations
import en from './globalLanguages/en.json'
import sv from './globalLanguages/sv.json'

// bind translations to i18n
I18n.translations = {
    en,
    sv
}
// Set the locale once at the beginning of your app.
I18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
I18n.fallbacks = true;

// export function
export function t(name) {
    return I18n.t(name)
}
