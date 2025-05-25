module.exports = {
    i18n: {
      defaultLocale: 'pt',
      locales: ['pt', 'en', 'es'],
    },
    defaultNS: "common",
    react: { useSuspense: false }, //TEMP
    reloadOnPrerender: process.env.NODE_ENV !== "production", // DEVELOPMENT-ONLY, IMPORTANT!
  };