export * from './navigation';

// Can be imported from a shared config
export const locales = ["en", "ru"] as const;
export const localePrefix = "always";
export type Locale = (typeof locales)[number];