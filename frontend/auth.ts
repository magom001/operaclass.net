import { UnstorageAdapter } from "@auth/unstorage-adapter";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Nodemailer from "next-auth/providers/nodemailer";
import { createStorage } from "unstorage"
 
const storage = createStorage()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: UnstorageAdapter(storage),
  providers: [
    Nodemailer({
      server: "smtp://maddison53@ethereal.email:jn7jnAPss4f63QBp6D@smtp.ethereal.email:587",
      from: "noreply@operaclas.net",
    })
    // Credentials({
    //   credentials: {
    //     email: {
    //       type: "email",
    //       label: "Email",
    //       placeholder: "john@snow.com",
    //     },
    //     password: {
    //       type: "password",
    //       label: "Password",
    //       placeholder: "********",
    //     },
    //   },
    //   authorize: async (credentials, req) => {
    //     const user: User = {
    //       id: "1",
    //       name: "John Snow",
    //       email: "john@snow.com",
    //     };
    //     return user;
    //   },
    // }),
  ],
});
