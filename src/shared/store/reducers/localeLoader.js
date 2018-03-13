export const locales = (lang) =>({
    lang,
    messages: require(`../translations/locale_${lang}.json`)
});