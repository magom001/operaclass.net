import { auth } from "../../auth";

export async function AuthenticatedUser() {
  const user = await auth();

  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <span>{user.user?.name}</span>
    </div>
  );
}
