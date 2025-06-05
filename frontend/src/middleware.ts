import createIntlMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./i18n";
import { NextRequest, NextResponse } from "next/server";


const handleI18nRouting = createIntlMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "en",

  localePrefix,
});

// export default async function middleware(request: NextRequest) {
//   const response = handleI18nRouting(request);

//   return response;
// }

export { auth as middleware } from "../auth";

export const config = {
  //   Match only internationalized pathnames
  matcher: ["/((?!api|_next|monitoring|.*\\..*).*)"],
};
