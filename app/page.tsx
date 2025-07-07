import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen relative flex justify-center items-center flex-col gap-3">
        <video
          src="/hero.mp4"
          className="w-full h-full object-cover opacity-50 absolute top-0 left-0 -z-10"
          autoPlay
          muted
          loop
        ></video>
        <h1 className="text-7xl text-center">Aranda Music and Arts Program</h1>
        <h2 className="text-2xl text-center">
          An after school music, drama and art program
        </h2>
      </div>
    </>
  );
}
