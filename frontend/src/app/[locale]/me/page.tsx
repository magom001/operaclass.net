import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";

export default async function Page() {
  const session = await auth();
  console.log("Session:", session);

  return (
    <div>
      <SignIn />
      <pre>
        {session?.expires}
        {session?.user?.email}
      </pre>
    </div>
  );
}
