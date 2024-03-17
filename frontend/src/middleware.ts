import createMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./i18n";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: 'unsafe-inline' ${
    process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
  };
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data: i.imgur.com;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    frame-src 'self' https://www.youtube.com;
`;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const handleI18nRouting = createMiddleware({
    // A list of all locales that are supported
    locales,

    // Used when no locale matches
    defaultLocale: "en",

    localePrefix,
  });

  const response = handleI18nRouting(request);

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  response.headers.set("x-nonce", nonce);

  return response;
}

export const config = {
  //   Match only internationalized pathnames
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
