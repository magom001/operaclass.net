"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback, useEffect, useState } from "react";

const RECAPTCHA_TOKEN_KEY = "recaptcha_token";
const RECAPTCHA_EXPIRY_KEY = "recaptcha_expiry";
// Token validity in milliseconds (10 minutes)
const TOKEN_VALIDITY = 10 * 60 * 1000;

export function useReCaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper function to store token in session storage
  const storeToken = useCallback((newToken: string) => {
    try {
      sessionStorage.setItem(RECAPTCHA_TOKEN_KEY, newToken);
      sessionStorage.setItem(RECAPTCHA_EXPIRY_KEY, (Date.now() + TOKEN_VALIDITY).toString());
    } catch (err) {
      console.warn("Failed to store recaptcha token in session storage", err);
    }
  }, []);

  // Helper function to get token from session storage
  const getStoredToken = useCallback((): { token: string | null; isValid: boolean } => {
    try {
      const storedToken = sessionStorage.getItem(RECAPTCHA_TOKEN_KEY);
      const expiryTime = sessionStorage.getItem(RECAPTCHA_EXPIRY_KEY);
      
      if (!storedToken || !expiryTime) {
        return { token: null, isValid: false };
      }
      
      const isValid = Date.now() < parseInt(expiryTime, 10);
      
      return { 
        token: isValid ? storedToken : null, 
        isValid 
      };
    } catch (err) {
      return { token: null, isValid: false };
    }
  }, []);

  const getToken = useCallback(
    async (action: string = "feedback_submit") => {
      // First check if we have a valid token in session storage
      const { token: storedToken, isValid } = getStoredToken();
      
      if (storedToken && isValid) {
        setToken(storedToken);
        return storedToken;
      }
      
      // If no valid token in storage, generate a new one
      if (!executeRecaptcha) {
        console.log("reCAPTCHA not initialized");
        setError("reCAPTCHA not initialized");
        return null;
      }

      try {
        const newToken = await executeRecaptcha(action);
        setToken(newToken);
        storeToken(newToken);
        return newToken;
      } catch (err) {
        console.error("Failed to execute reCAPTCHA:", err);
        setError("Failed to execute reCAPTCHA");
        return null;
      }
    },
    [executeRecaptcha, getStoredToken, storeToken]
  );

  // Initialize on component mount
  useEffect(() => {
    // Check session storage first
    const { token: storedToken, isValid } = getStoredToken();
    
    if (storedToken && isValid) {
      setToken(storedToken);
    } else if (executeRecaptcha) {
      // Generate new token if needed
      getToken();
    }
  }, [executeRecaptcha, getToken, getStoredToken]);

  return { token, error, getToken };
}