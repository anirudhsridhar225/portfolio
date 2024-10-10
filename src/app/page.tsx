import { Space_Mono, Work_Sans } from "next/font/google";

const space = Space_Mono({
  weight: "400",
  subsets: ['latin'],
  display: "swap"
});

const work = Work_Sans({
  subsets: ['latin'],
  display: "swap"
});

export default function Home() {
  return (
    <main className="min-h-screen w-screen">
      <section className="text-3xl font-medium text-[var(--fg)] p-10">
        <span className={work.className}>Hi I am Anirudh Sridhar.</span> <br />
        <p className={space.className}><span className="text-lg">This my lil website.</span></p>
      </section>
    </main>
  );
}
