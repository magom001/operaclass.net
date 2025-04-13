import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import TelegramBot from "node-telegram-bot-api";
import { PageParams } from "../layout";
import { FeedbackForm, FormState } from "./FeedbackForm";
import { ReCaptchaProvider } from "./ReCaptchaComponent";

const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const dynamic = "force-dynamic";

// Utility function to verify reCAPTCHA token
async function verifyRecaptchaV3(
  token: string
): Promise<{ success: boolean; score?: number }> {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY!,
          response: token,
        }).toString(),
      }
    );

    const data = await response.json();
    return {
      success: data.success,
      score: data.score,
    };
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return { success: false };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    metadataBase: new URL("https://operaclass.net"),
    title: `OperaClass.net | ${t("Feedback.title")}`,
    description: t("Feedback.meta-description"),
    alternates: {
      canonical: "/feedback/",
      languages: {
        en: "/en/feedback/",
        ru: "/ru/feedback/",
        "x-default": "/feedback/",
      },
    },
  };
}

export default async function Page(params: PageParams, data: FormData) {
  const messages = await getMessages();
  const t = await getTranslations();
  async function sendFeedback(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    "use server";

    const t = await getTranslations();
    const errors: FormState["errors"] = {};
    // Get reCAPTCHA token
    const recaptchaToken = formData.get("recaptchaToken") as string;

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      errors["recaptcha"] = t("Errors.recaptcha-required");
    } else {
      const recaptchaResult = await verifyRecaptchaV3(recaptchaToken);
      // You can adjust the threshold based on your preferences
      // Score ranges from 0.0 to 1.0, where 1.0 is very likely a good interaction
      if (
        !recaptchaResult.success ||
        (recaptchaResult.score !== undefined && recaptchaResult.score < 0.5)
      ) {
        errors["recaptcha"] = t("Errors.recaptcha-failed");
      }
    }

    const message = formData.get("message") as string;

    if (!message || !message.trim().length) {
      errors["message"] = t("Errors.required");
    }

    const name = formData.get("name") as string;

    if (!name || !name.trim().length) {
      errors["name"] = t("Errors.required");
    }

    const email = formData.get("email") as string;

    if (email && !EMAIL_REGEX.test(email)) {
      errors["email"] = t("Errors.invalid-email");
    }

    if (Object.keys(errors).length) {
      return { errors, sent: false };
    }

    try {
      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
        polling: false,
      });
      const formattedMessage = `From: ${name} (${
        email || "n/a"
      })\n\nMessage: ${message}`;

      bot.sendMessage(process.env.TELEGRAM_CHAT_ID!, formattedMessage);
    } catch (error) {
      console.error(error);

      return { sent: false, fatal: true };
    }

    return { sent: true };
  }

  return (
    <article className="mx-auto my-4 max-w-md p-2 h-full flex flex-col has-data-[terminal='true']:justify-center">
      <NextIntlClientProvider messages={messages}>
        <ReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        >
          <FeedbackForm action={sendFeedback} />
        </ReCaptchaProvider>
      </NextIntlClientProvider>
    </article>
  );
}
