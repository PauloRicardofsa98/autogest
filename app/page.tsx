import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./_components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="grid h-screen grid-cols-[2fr,1fr] gap-4 bg-black">
      <div className="polygon h-full w-full bg-red-200">
        <Image src="/opala.png" alt="Formotech" className="object-cover" fill />
      </div>
      <div className="flex items-center justify-start p-8">
        <div className="space-y-6 text-center text-white">
          <div>
            <h2 className="text-3xl">Bem vindo a</h2>
            <h2 className="text-bold text-6xl">FormoTech</h2>
          </div>
          <SignInButton mode="modal">
            <Button className="w-full text-xl font-semibold">Acessar</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}
