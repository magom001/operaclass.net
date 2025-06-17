import createIntlMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./i18n";
import { auth } from "./auth";

const handleI18nRouting = createIntlMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix,
});


// Wrap the auth middleware to handle NextRequest properly
export default auth((request) => {
  // Check if this is an API route
  if (request.nextUrl.pathname.startsWith("/api")) {
    // For API routes, just apply auth (no i18n needed)
    return;
  }

  // For non-API routes, apply i18n routing after auth
  return handleI18nRouting(request);
});

export const config = {
  // Apply to all routes (removed api exclusion)
  matcher: ["/((?!_next|monitoring|.*\\..*).*)"],
};
