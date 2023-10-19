import { useSession } from "next-auth/react";

export default function Home() {
  const data = useSession();
  return (
    <main>
      <h1>Hello World</h1>
    </main>
  );
}
