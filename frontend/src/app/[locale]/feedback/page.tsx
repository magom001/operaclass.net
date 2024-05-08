import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import TelegramBot from "node-telegram-bot-api";
import { PageParams } from "../layout";
import { FeedbackForm, FormState } from "./FeedbackForm";

const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const dynamic = "force-dynamic";

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

export default async function Page(
  { params: { locale } }: PageParams,
  data: FormData
) {
  const messages = await getMessages();
  const t = await getTranslations();
  async function sendFeedback(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    "use server";

    const t = await getTranslations();
    const errors: FormState["errors"] = {};

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

  console.log(data ? Object.entries(data) : "nada");

  return (
    <article className="mx-auto my-4 max-w-md p-2 h-full flex flex-col has-[[data-terminal='true']]:justify-center">
      <NextIntlClientProvider messages={messages}>
        <FeedbackForm action={sendFeedback} />
      </NextIntlClientProvider>
    </article>
  );
}
