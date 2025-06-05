import { NextRequest, NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import createIntlMiddleware from 'next-intl/middleware'
import { locales, localePrefix } from '@/i18n' // Corrected import

// Define defaultLocale, as it's not exported from @/i18n
const defaultLocale = locales[0] || "en"; // Fallback to "en" if locales array is empty, though unlikely

const intlMiddleware = createIntlMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: localePrefix,
})

const { auth } = NextAuth(authOptions)

export default auth((req) => {
  // For API routes used by NextAuth, let NextAuth handle them directly.
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next() // Necessary to allow NextAuth to handle its own API routes
  }

  // Apply internationalization to the request.
  // The response object from intlMiddleware will be used for further processing or returned.
  const response = intlMiddleware(req)

  // Protect the /profile route
  // This check is performed after intlMiddleware so locale information should be stable
  if (req.nextUrl.pathname.includes('/profile')) {
    if (!req.auth) { // If the user is not authenticated
      // Construct the sign-in URL, attempting to preserve the current locale.
      const locale = req.nextUrl.pathname.split('/')[1]
      let signInUrl = `/${locale}/auth/signin`

      // Fallback to default locale if the extracted locale is not valid
      if (!locales.includes(locale as any)) {
        signInUrl = `/${defaultLocale}/auth/signin`
      }
      return NextResponse.redirect(new URL(signInUrl, req.url))
    }
  }

  // CSP Header Logic (from original middleware)
  // TODO: The nonce generation might need to be tied to the specific response being sent,
  // especially if intlMiddleware or NextAuth redirects modify the response.
  // For now, we apply it to the response derived from intlMiddleware or the final response.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: 'unsafe-inline' ${process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`};
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data: i.imgur.com;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    frame-src 'self' https://www.youtube.com;`;

  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  // Apply CSP headers to the response.
  // Note: If a redirect occurs above, this part won't be reached for that request.
  // CSP should ideally be applied to the final outgoing response.
  response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);
  response.headers.set("x-nonce", nonce); // Custom header for nonce, if needed by script tags

  return response // Return the processed response (from intlMiddleware, potentially with CSP headers)
})

export const config = {
  // Matcher updated to include routes that need i18n and/or auth,
  // while excluding NextAuth API, static files, images, etc.
  // The original matcher was: ["/((?!api|_next|monitoring|.*\\..*).*)"]
  // The new one is more explicit based on common Next.js patterns and the prompt's example.
  matcher: ['/((?!api/auth|_next/static|_next/image|assets|favicon.ico|sw.js|robots.txt|sitemap.ts).*)'],
}
