import { UnstorageAdapter } from "@auth/unstorage-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createStorage } from "unstorage";

const storage = createStorage();
const providers = [];

if (process.env.NEXT_RUNTIME !== "edge") {
  const { default: Nodemailer } = await import(
    "next-auth/providers/nodemailer"
  );

  providers.push(
    Nodemailer({
      server:
        "smtp://maddison53@ethereal.email:jn7jnAPss4f63QBp6D@smtp.ethereal.email:587",
      from: "noreply@operaclas.net",
      sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params;
        const { host } = new URL(url);
        const body = html({ url, host, theme });
        console.log(url);
      },
    })
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: UnstorageAdapter(storage, { useItemRaw: true }),
  cookies: {
    sessionToken: {
      options: {
        expires: new Date("2099-01-01T00:00:00.000Z"), // Far future date
      },
    },
  },
  debug: true,
  session: {
    strategy: "database",
  },
  providers,
});

function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
