# Manual Testing for Authentication Flow

This document outlines the steps to manually test the implemented passwordless authentication flow using email and OTP.

## Prerequisites

1.  **Application Running:** Ensure the `frontend` application is running (e.g., `yarn develop` from the `frontend` directory).
2.  **Mock SMTP Output:** Be prepared to check the console output of the `frontend` application. The mock SMTP server is configured to print the OTP to the console.
3.  **Environment Variables:** Ensure `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are set in your local `.env` file in the `frontend` directory (you can copy from `.env.example` and fill them).

## Test Cases

### 1. Sign In with Email OTP

*   **Objective:** Verify that a user can sign in using their email address and an OTP sent to the console.
*   **Steps:**
    1.  Navigate to the home page or any page with a "Sign in" button.
    2.  Click the "Sign in with Email" button.
    3.  You should be redirected to the `/auth/signin` page (or its localized equivalent, e.g., `/en/auth/signin`).
    4.  Enter a valid email address in the input field.
    5.  Click the "Sign in with Email" button on this page.
    6.  Check the console output of your `frontend` application. You should see a message like: `OTP for your.email@example.com: 123456 (mail sent: <some_id>)`. Note the 6-digit OTP.
    7.  The application should now display a page asking you to verify your email and check your inbox for a magic link/OTP. Since we are using OTP, you will be redirected to a page like `/auth/verify-request` or similar, or it might expect the OTP on a specific page if we were to build a custom UI for OTP entry (currently, NextAuth's default email provider flow might redirect to a generic "check your email" page, and the link in the email (console output) will contain the token).
        *   **Note:** The default Email provider flow in NextAuth typically sends a magic link. Our custom `sendVerificationRequest` logs the OTP. The URL in the console log might look like `http://localhost:3000/api/auth/callback/email?callbackUrl=%2F&token=YOUR_OTP&email=your.email%40example.com`.
    8.  Construct the callback URL by taking the base URL from the console output (e.g., `http://localhost:3000/api/auth/callback/email`) and appending the query parameters `token` (which is our OTP) and `email`. For example: `http://localhost:3000/api/auth/callback/email?token=THE_OTP_FROM_CONSOLE&email=THE_EMAIL_YOU_USED&callbackUrl=/` (ensure `callbackUrl` matches what was used, or is a valid path).
    9.  Open this constructed URL in your browser.
*   **Expected Result:**
    *   You should be successfully signed in.
    *   The header should now display "Signed in as your.email@example.com" and a "Sign out" button.
    *   If you navigate to the `/profile` page (e.g., `/en/profile`), you should see the profile page content.

### 2. Sign Out

*   **Objective:** Verify that a user can sign out.
*   **Steps:**
    1.  Ensure you are signed in (follow Test Case 1).
    2.  Click the "Sign out" button in the header.
*   **Expected Result:**
    *   You should be successfully signed out.
    *   The header should revert to showing "Not signed in" and the "Sign in with Email" button.
    *   If you try to navigate to the `/profile` page, you should be redirected to the sign-in page.

### 3. Protected Route Access - Unauthenticated

*   **Objective:** Verify that an unauthenticated user is redirected from a protected route.
*   **Steps:**
    1.  Ensure you are signed out.
    2.  Attempt to navigate directly to the `/profile` page (e.g., `/en/profile`).
*   **Expected Result:**
    *   You should be redirected to the `/auth/signin` page (or its localized equivalent).

### 4. Protected Route Access - Authenticated

*   **Objective:** Verify that an authenticated user can access a protected route.
*   **Steps:**
    1.  Ensure you are signed in.
    2.  Navigate directly to the `/profile` page (e.g., `/en/profile`).
*   **Expected Result:**
    *   You should see the content of the profile page, including your email.

## Notes

*   The OTP is valid for a limited time (NextAuth default is 24 hours for email tokens, but for OTPs it's usually much shorter; our current setup doesn't enforce a specific OTP expiry beyond the token's own expiry if it were a typical token).
*   The mock SMTP server only prints to the console. No actual email is sent.
*   The exact URL for OTP verification might vary based on NextAuth version and specific configurations. The key is to use the OTP from the console as the `token` parameter in the callback URL.
