"use client";

import { useRouter } from "@/i18n";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";

interface Props {
  action: (
    prevState: FormState,
    data: FormData
  ) => FormState | Promise<FormState>;
}

export interface FormState {
  errors?: Record<string, string>;
  sent: boolean;
  fatal?: boolean;
}

const initialState = {
  errors: undefined,
  sent: false,
} satisfies FormState;

export function FeedbackForm({ action }: Props) {
  const t = useTranslations();
  // @ts-expect-error
  const [state, formAction] = useFormState<FormState>(action, initialState);

  if (state.fatal) {
    return (
      <div className="text-center text-3xl font-bold mb-32" data-terminal>
        <p>🤕</p>
        <p className="first-letter:capitalize">{t("Feedback.failed")}</p>
      </div>
    );
  }

  if (state.sent) {
    return (
      <div className="text-center text-3xl font-bold mb-32" data-terminal>
        <p>🥳</p>
        <p className="first-letter:capitalize">{t("Feedback.sent")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col">
      <h1 className="text-center font-bold text-2xl mb-4">
        {t("Feedback.title")}
      </h1>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 first-letter:capitalize"
          htmlFor="name"
        >
          {t("Feedback.name")}*
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          id="name"
          required
        />
        {state.errors?.["name"] ? (
          <p className="text-red-500 text-xs italic first-letter:capitalize">
            {state.errors["name"]}
          </p>
        ) : null}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 first-letter:capitalize"
          htmlFor="email"
        >
          {t("Feedback.email")}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          name="email"
          id="email"
        />
        {state.errors?.["email"] ? (
          <p className="text-red-500 text-xs italic first-letter:capitalize">
            {state.errors["email"]}
          </p>
        ) : null}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 first-letter:capitalize"
          htmlFor="message"
        >
          {t("Feedback.message")}*
        </label>
        <textarea
          rows={10}
          name="message"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          required
        />
        {state.errors?.["message"] ? (
          <p className="text-red-500 text-xs italic first-letter:capitalize">
            {state.errors["message"]}
          </p>
        ) : null}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const t = useTranslations();
  const status = useFormStatus();

  return (
    <button
      disabled={status.pending}
      className="first-letter:capitalize font-bold px-8 py-2 rounded-md border-2 text-gray-700 disabled:opacity-50 border-current self-center"
      type="submit"
      title={t("Feedback.send")}
    >
      {t("Feedback.send")}
    </button>
  );
}
