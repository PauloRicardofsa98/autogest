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
    <div className="grid grid-cols-[2fr,1fr] gap-4 h-full bg-black">
      <div className="polygon bg-red-200 h-full w-full">
        <Image
          src="/opala.png"
          alt="Formotech"
          className="object-cover "
          fill
        />
      </div>
      <div className="flex justify-start items-center  p-8">
        <div className="text-white text-center space-y-6">
          <div>
            <h2 className="text-3xl">Bem vindo a</h2>
            <h2 className="text-6xl text-bold">FormoTech</h2>
          </div>
          <SignInButton mode="modal">
            <Button className="w-full font-semibold text-xl">Acessar</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}
