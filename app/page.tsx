import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";
import { LogInButton, LogOutButton } from "@/components/component/auth/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Client Session: <User />
        Server Session: <pre>{JSON.stringify(session)}</pre>
      </div>
    </main>
  );
}
