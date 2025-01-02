import Image from "next/image";

export default function Home() {
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
        <div className="text-white text-center">
          <h2 className="text-3xl">Bem vindo a</h2>
          <h2 className="text-6xl text-bold">FormoTech</h2>
        </div>
      </div>
    </div>
  );
}
