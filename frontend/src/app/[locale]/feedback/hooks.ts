"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback, useEffect, useState } from "react";

export function useReCaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getToken = useCallback(
    async (action: string = "feedback_submit") => {
      if (!executeRecaptcha) {
        console.log("reCAPTCHA not initialized");
        setError("reCAPTCHA not initialized");
        return null;
      }

      try {
        const newToken = await executeRecaptcha(action);
        setToken(newToken);
        return newToken;
      } catch (err) {
        console.error("Failed to execute reCAPTCHA:", err);
        setError("Failed to execute reCAPTCHA");
        return null;
      }
    },
    [executeRecaptcha]
  );

  // Generate token on initial load
  useEffect(() => {
    if (executeRecaptcha) {
      getToken();
    }
  }, [executeRecaptcha, getToken]);

  return { token, error, getToken };
}
